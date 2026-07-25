"use server";

import { redirect } from "next/navigation";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { serverSecret } from "@/app/lib/convexServer";
import { destroyAdminSession, requireAdmin } from "@/app/lib/adminSession";

const STATUSES = ["pending", "confirmed", "cancelled"] as const;
export type PaymentStatus = (typeof STATUSES)[number];

export type ActionResult = { ok: boolean; message?: string };

function parseStatus(value: unknown): PaymentStatus | null {
  return STATUSES.includes(value as PaymentStatus)
    ? (value as PaymentStatus)
    : null;
}

/**
 * Server Actions are reachable by direct POST, not only through our own UI,
 * so the admin check lives in here rather than only on the page.
 */
export async function setStatus(
  id: string,
  status: string,
): Promise<ActionResult> {
  const adminEmail = await requireAdmin();

  const paymentStatus = parseStatus(status);
  if (!id || !paymentStatus) {
    return { ok: false, message: "That status isn't valid." };
  }

  try {
    await fetchMutation(api.registrations.setPaymentStatus, {
      secret: serverSecret(),
      id: id as Id<"registrations">,
      paymentStatus,
      reviewedBy: adminEmail,
    });
  } catch (error) {
    console.error("[BCaD admin] status update failed:", error);
    return { ok: false, message: "Couldn't save — please try again." };
  }

  // Deliberately no revalidatePath: the dashboard holds the whole list in
  // memory and updates the touched row optimistically. Revalidating here
  // refetched every registration to flip one field, which made a batch of
  // reconciliations crawl.
  return { ok: true };
}

export async function saveNotes(
  id: string,
  notes: string,
): Promise<ActionResult> {
  const adminEmail = await requireAdmin();

  if (!id) return { ok: false, message: "Missing registration." };

  try {
    await fetchMutation(api.registrations.setAdminNotes, {
      secret: serverSecret(),
      id: id as Id<"registrations">,
      adminNotes: notes.slice(0, 2000),
      reviewedBy: adminEmail,
    });
  } catch (error) {
    console.error("[BCaD admin] notes update failed:", error);
    return { ok: false, message: "Couldn't save — please try again." };
  }

  // Deliberately no revalidatePath: the dashboard holds the whole list in
  // memory and updates the touched row optimistically. Revalidating here
  // refetched every registration to flip one field, which made a batch of
  // reconciliations crawl.
  return { ok: true };
}

export async function signOut() {
  await destroyAdminSession();
  redirect("/admin/login");
}
