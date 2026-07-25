import { NextResponse, type NextRequest } from "next/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { serverSecret } from "@/app/lib/convexServer";
import { getAdminEmail } from "@/app/lib/adminSession";
import {
  EXPERIENCE_LABELS,
  PACKAGE_LABELS,
  SESSION_LABELS,
  labelFor,
} from "@/app/(site)/register/labels";
import { packageAmount } from "@/app/(site)/register/packages";
import { inView, matchesSearch, sortForView, type ViewKey } from "../filtering";
import type { Registration } from "../types";

const COLUMNS = [
  "Submitted",
  "Full name",
  "Email",
  "Phone",
  "City",
  "Package",
  "Amount ETB",
  "Session",
  "Experience",
  "Business idea",
  "Professional background",
  "Payment status",
  "Notes",
  "Last updated by",
  "Confirmation email sent",
] as const;

/**
 * Excel and Google Sheets treat a leading =, +, - or @ as a formula, so a
 * field like "=cmd|..." pasted into a registration would execute on open.
 * Prefixing with an apostrophe keeps it inert.
 *
 * `+` and `-` only get that treatment when what follows isn't a digit —
 * otherwise every Ethiopian phone number ("+251…") would arrive mangled, and
 * the phone column is the one the team actually uses.
 */
function csvCell(value: string | undefined): string {
  const text = (value ?? "").replace(/\r?\n/g, " ").trim();
  const risky = /^[=@]/.test(text) || /^[+-][^\d]/.test(text);
  return `"${(risky ? `'${text}` : text).replace(/"/g, '""')}"`;
}

function formatDate(ms: number | undefined): string {
  if (!ms) return "";
  return new Date(ms).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Addis_Ababa",
  });
}

export async function GET(request: NextRequest) {
  // Route Handlers are public endpoints — check auth here too.
  const adminEmail = await getAdminEmail();
  if (!adminEmail) {
    return NextResponse.redirect(
      new URL("/admin/login", request.nextUrl.origin),
    );
  }

  // Mirrors whatever the dashboard is showing, so "Download CSV" exports the
  // list on screen rather than a different one.
  const params = request.nextUrl.searchParams;
  const viewParam = params.get("view");
  const view: ViewKey = (
    ["attention", "pending", "confirmed", "cancelled", "all"] as const
  ).includes(viewParam as ViewKey)
    ? (viewParam as ViewKey)
    : "all";
  const query = params.get("q") ?? "";

  const { rows: allRows } = await fetchQuery(api.registrations.list, {
    secret: serverSecret(),
    limit: 1000,
  });

  const rows = sortForView(
    (allRows as Registration[]).filter(
      (row) => inView(row, view) && matchesSearch(row, query),
    ),
    view,
  );

  const lines = [
    COLUMNS.map((column) => csvCell(column)).join(","),
    ...rows.map((row) =>
      [
        formatDate(row._creationTime),
        row.fullName,
        row.email,
        row.phone,
        row.city,
        labelFor(PACKAGE_LABELS, row.packageId),
        String(packageAmount(row.packageId)),
        labelFor(SESSION_LABELS, row.sessionPreference),
        labelFor(EXPERIENCE_LABELS, row.experience),
        row.businessIdea,
        row.background,
        row.paymentStatus,
        row.adminNotes,
        row.reviewedBy,
        row.confirmationEmailSent ? "yes" : "no",
      ]
        .map(csvCell)
        .join(","),
    ),
  ];

  // BOM so Excel opens the UTF-8 correctly.
  const csv = `﻿${lines.join("\r\n")}`;
  const stamp = new Date().toISOString().slice(0, 10);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="bcad-registrations-${view}-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
