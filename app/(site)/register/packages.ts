export type PackageId = "one-day" | "one-week" | "two-weeks" | "full";

export type TrainingPackage = {
  id: PackageId;
  title: string;
  duration: string;
  /** Formatted for display on the public site. */
  price: string;
  /** Numeric birr, for the admin amount column and reconciliation totals. */
  amountETB: number;
};

export const TRAINING_PACKAGES: TrainingPackage[] = [
  {
    id: "one-day",
    title: "One-day training",
    duration: "1 day",
    price: "2,000 ETB",
    amountETB: 2000,
  },
  {
    id: "one-week",
    title: "One week",
    duration: "1 week",
    price: "7,500 ETB",
    amountETB: 7500,
  },
  {
    id: "two-weeks",
    title: "Two weeks",
    duration: "2 weeks",
    price: "12,500 ETB",
    amountETB: 12500,
  },
  {
    id: "full",
    title: "Full package",
    duration: "4 weeks",
    price: "20,000 ETB",
    amountETB: 20000,
  },
];

export function getPackage(id: string | undefined) {
  return TRAINING_PACKAGES.find((p) => p.id === id);
}

/** 0 for an unrecognised package id, so totals never become NaN. */
export function packageAmount(id: string | undefined): number {
  return getPackage(id)?.amountETB ?? 0;
}
