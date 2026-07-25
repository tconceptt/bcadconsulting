export type PackageId = "one-day" | "one-week" | "two-weeks" | "full";

export type TrainingPackage = {
  id: PackageId;
  title: string;
  duration: string;
  price: string;
};

export const TRAINING_PACKAGES: TrainingPackage[] = [
  { id: "one-day", title: "One-day training", duration: "1 day", price: "2,000 ETB" },
  { id: "one-week", title: "One week", duration: "1 week", price: "7,500 ETB" },
  { id: "two-weeks", title: "Two weeks", duration: "2 weeks", price: "12,500 ETB" },
  { id: "full", title: "Full package", duration: "4 weeks", price: "20,000 ETB" },
];

export function getPackage(id: string | undefined) {
  return TRAINING_PACKAGES.find((p) => p.id === id);
}
