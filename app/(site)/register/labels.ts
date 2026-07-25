import { TRAINING_PACKAGES } from "./packages";

/**
 * Human-readable labels for the coded values stored on a registration.
 * Shared by the confirmation emails and the /admin dashboard so the team
 * always reads the same wording the applicant saw.
 */

export const PACKAGE_LABELS: Record<string, string> = Object.fromEntries(
  TRAINING_PACKAGES.map((p) => [p.id, `${p.title} (${p.duration}) — ${p.price}`]),
);

/** Terse variants for dense list rows, where the price and times don't fit. */
export const PACKAGE_SHORT_LABELS: Record<string, string> = Object.fromEntries(
  TRAINING_PACKAGES.map((p) => [p.id, p.title]),
);

export const SESSION_SHORT_LABELS: Record<string, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  flexible: "Flexible",
};

export const EXPERIENCE_LABELS: Record<string, string> = {
  "just-an-idea": "Just an idea — exploring",
  "early-stage": "Early-stage / pre-revenue",
  running: "Running a business already",
  returning: "Returning / pivoting",
};

export const SESSION_LABELS: Record<string, string> = {
  morning: "Morning (8:30 – 12:00)",
  afternoon: "Afternoon (1:30 – 5:00 pm)",
  evening: "Evening (6:00 – 8:00 pm)",
  flexible: "Flexible — happy with any session",
};

export function labelFor(map: Record<string, string>, value: string): string {
  return map[value] ?? value;
}
