import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const paymentStatusValidator = v.union(
  v.literal("pending"),
  v.literal("confirmed"),
  v.literal("cancelled"),
);

export default defineSchema({
  /**
   * One row per training registration submitted from /register.
   * Written before the Resend emails go out, so a mail outage can never
   * lose a registration.
   */
  registrations: defineTable({
    fullName: v.string(),
    email: v.string(),
    phone: v.string(),
    city: v.string(),
    background: v.optional(v.string()),
    businessIdea: v.string(),
    experience: v.string(),
    packageId: v.string(),
    sessionPreference: v.string(),

    // Admin-managed reconciliation fields.
    paymentStatus: paymentStatusValidator,
    adminNotes: v.optional(v.string()),
    reviewedBy: v.optional(v.string()),
    reviewedAt: v.optional(v.number()),

    // Whether the applicant's confirmation copy actually left Resend.
    confirmationEmailSent: v.boolean(),
  })
    .index("by_email", ["email"])
    .index("by_paymentStatus", ["paymentStatus"]),

  /**
   * Single-use magic-link tokens for the /admin area. Only the SHA-256 hash
   * of the token is stored, so a database leak cannot be replayed as a login.
   */
  adminLoginTokens: defineTable({
    email: v.string(),
    tokenHash: v.string(),
    expiresAt: v.number(),
    usedAt: v.optional(v.number()),
  })
    .index("by_tokenHash", ["tokenHash"])
    .index("by_email", ["email"]),
});
