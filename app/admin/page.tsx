import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { serverSecret } from "@/app/lib/convexServer";
import { requireAdmin } from "@/app/lib/adminSession";
import { RegistrationsDashboard } from "./RegistrationsDashboard";
import type { Registration } from "./types";

export const metadata: Metadata = {
  title: "Training registrations",
  robots: { index: false, follow: false },
};

/**
 * The whole list is fetched once and filtered in the browser. At this volume
 * (hundreds at most) that makes search and status filters instant, keeps the
 * chip counts honest across every view, and avoids a round trip per keystroke.
 */
const PAGE_LIMIT = 1000;

export default async function AdminPage() {
  const adminEmail = await requireAdmin();

  const { rows, hasMore } = await fetchQuery(api.registrations.list, {
    secret: serverSecret(),
    limit: PAGE_LIMIT,
  });

  return (
    <RegistrationsDashboard
      initialRows={rows as Registration[]}
      adminEmail={adminEmail}
      truncated={hasMore}
    />
  );
}
