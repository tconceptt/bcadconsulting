import type { Registration } from "./types";

/**
 * Ethiopian numbers reach us in several shapes for the same phone:
 * "0911 22 33 44", "+251911223344", "251911223344". Comparing the last nine
 * digits makes all of them match each other, which is what staff need when
 * they're reading a number off a bank statement.
 */
export function phoneKey(value: string): string {
  return value.replace(/\D/g, "").slice(-9);
}

function fold(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/**
 * Every whitespace-separated token must match somewhere, in any order — so
 * "kebede abebe" still finds "Abebe Kebede". Only name, email and phone are
 * searched: including the business-idea free text produced confusing hits on
 * common words.
 *
 * Substring matching only, deliberately no fuzzy/edit-distance: a false match
 * is dangerous when someone is deciding whether a payment has arrived.
 */
export function matchesSearch(row: Registration, query: string): boolean {
  const trimmed = query.trim();
  if (!trimmed) return true;

  const haystack = fold(`${row.fullName} ${row.email} ${row.phone}`);
  const digits = phoneKey(row.phone);

  return fold(trimmed)
    .split(/\s+/)
    .every((token) => {
      if (haystack.includes(token)) return true;

      // A numeric token is probably a phone fragment. Normalise it the same
      // way as the stored number so the local "0911…" form matches the
      // international "+251911…" one — they differ only in the trunk prefix.
      const tokenDigits = token.replace(/\D/g, "");
      if (tokenDigits.length < 4) return false;
      const needle =
        tokenDigits.length >= 9 ? tokenDigits.slice(-9) : tokenDigits;
      return digits.includes(needle);
    });
}

export type ViewKey =
  | "attention"
  | "pending"
  | "confirmed"
  | "cancelled"
  | "all";

/**
 * "Needs attention" is the work queue: anyone still unpaid, plus anyone whose
 * confirmation email failed and who therefore may not know they registered.
 */
export function inView(row: Registration, view: ViewKey): boolean {
  switch (view) {
    case "attention":
      return row.paymentStatus === "pending" || !row.confirmationEmailSent;
    case "pending":
      return row.paymentStatus === "pending";
    case "confirmed":
      return row.paymentStatus === "confirmed";
    case "cancelled":
      return row.paymentStatus === "cancelled";
    case "all":
      return true;
  }
}

/** Oldest first while working a queue; newest first when browsing. */
export function sortForView(rows: Registration[], view: ViewKey): Registration[] {
  const ordered = [...rows];
  const oldestFirst = view === "attention" || view === "pending";
  ordered.sort((a, b) =>
    oldestFirst
      ? a._creationTime - b._creationTime
      : b._creationTime - a._creationTime,
  );
  return ordered;
}

export function formatBirr(amount: number): string {
  return amount.toLocaleString("en-US");
}
