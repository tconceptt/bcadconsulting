export type PaymentStatus = "pending" | "confirmed" | "cancelled";

/** Shape of a registration as the dashboard consumes it. */
export type Registration = {
  _id: string;
  _creationTime: number;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  background?: string;
  businessIdea: string;
  experience: string;
  packageId: string;
  sessionPreference: string;
  paymentStatus: PaymentStatus;
  adminNotes?: string;
  reviewedBy?: string;
  reviewedAt?: number;
  confirmationEmailSent: boolean;
};
