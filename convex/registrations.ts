import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paymentStatusValidator } from "./schema";
import { rateLimiter } from "./rateLimits";
import { assertServer, secretArg } from "./serverAuth";

/**
 * A repeat submission of the same email + package inside this window is
 * treated as a double-click or a retry, not a second application.
 */
const DEDUPE_WINDOW_MS = 10 * 60 * 1000;

/** Upper bound on rows the admin page can pull in one request. */
const MAX_PAGE = 1000;

export const create = mutation({
  args: {
    ...secretArg,
    fullName: v.string(),
    email: v.string(),
    phone: v.string(),
    city: v.string(),
    background: v.optional(v.string()),
    businessIdea: v.string(),
    experience: v.string(),
    packageId: v.string(),
    sessionPreference: v.string(),
  },
  handler: async (ctx, args) => {
    assertServer(args.secret);

    const fields = {
      fullName: args.fullName,
      email: args.email,
      phone: args.phone,
      city: args.city,
      background: args.background,
      businessIdea: args.businessIdea,
      experience: args.experience,
      packageId: args.packageId,
      sessionPreference: args.sessionPreference,
    };

    // Return the existing row rather than a second one when someone
    // double-submits, so the team never sees phantom duplicate applicants.
    const recent = await ctx.db
      .query("registrations")
      .withIndex("by_email", (q) => q.eq("email", fields.email))
      .order("desc")
      .take(5);

    const duplicate = recent.find(
      (row) =>
        row.packageId === fields.packageId &&
        Date.now() - row._creationTime < DEDUPE_WINDOW_MS,
    );
    if (duplicate) {
      return { status: "duplicate" as const, id: duplicate._id };
    }

    const perEmail = await rateLimiter.limit(ctx, "registrationPerEmail", {
      key: fields.email,
    });
    if (!perEmail.ok) {
      return { status: "rate_limited" as const, retryAfter: perEmail.retryAfter };
    }
    const global = await rateLimiter.limit(ctx, "registrationGlobal");
    if (!global.ok) {
      return { status: "rate_limited" as const, retryAfter: global.retryAfter };
    }

    const id = await ctx.db.insert("registrations", {
      ...fields,
      paymentStatus: "pending" as const,
      confirmationEmailSent: false,
    });
    return { status: "created" as const, id };
  },
});

/**
 * Records that the applicant's confirmation copy actually left Resend, so the
 * admin page can flag the ones who never heard back from us.
 */
export const markConfirmationEmailSent = mutation({
  args: { ...secretArg, id: v.id("registrations") },
  handler: async (ctx, args) => {
    assertServer(args.secret);
    const existing = await ctx.db.get("registrations", args.id);
    if (!existing) return null;
    await ctx.db.patch("registrations", args.id, {
      confirmationEmailSent: true,
    });
    return null;
  },
});

export const list = query({
  args: {
    ...secretArg,
    paymentStatus: v.optional(paymentStatusValidator),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    assertServer(args.secret);
    const limit = Math.min(Math.max(args.limit ?? 500, 1), MAX_PAGE);
    const status = args.paymentStatus;

    // Take one extra row so the page can honestly report that it truncated.
    const rows = status
      ? await ctx.db
          .query("registrations")
          .withIndex("by_paymentStatus", (q) => q.eq("paymentStatus", status))
          .order("desc")
          .take(limit + 1)
      : await ctx.db.query("registrations").order("desc").take(limit + 1);

    return {
      rows: rows.slice(0, limit),
      hasMore: rows.length > limit,
    };
  },
});

/**
 * Status and notes are separate mutations on purpose: the dashboard changes
 * status with one click without touching the notes box, and saves notes
 * without re-asserting a status. A combined mutation meant whichever control
 * submitted last silently overwrote the other one's field.
 */
export const setPaymentStatus = mutation({
  args: {
    ...secretArg,
    id: v.id("registrations"),
    paymentStatus: paymentStatusValidator,
    reviewedBy: v.string(),
  },
  handler: async (ctx, args) => {
    assertServer(args.secret);
    const existing = await ctx.db.get("registrations", args.id);
    if (!existing) throw new Error("Registration not found");

    await ctx.db.patch("registrations", args.id, {
      paymentStatus: args.paymentStatus,
      reviewedBy: args.reviewedBy,
      reviewedAt: Date.now(),
    });
    return null;
  },
});

export const setAdminNotes = mutation({
  args: {
    ...secretArg,
    id: v.id("registrations"),
    adminNotes: v.string(),
    reviewedBy: v.string(),
  },
  handler: async (ctx, args) => {
    assertServer(args.secret);
    const existing = await ctx.db.get("registrations", args.id);
    if (!existing) throw new Error("Registration not found");

    const notes = args.adminNotes.trim();
    await ctx.db.patch("registrations", args.id, {
      // `undefined` clears the field, which is what an emptied box should mean.
      adminNotes: notes === "" ? undefined : notes,
      reviewedBy: args.reviewedBy,
      reviewedAt: Date.now(),
    });
    return null;
  },
});
