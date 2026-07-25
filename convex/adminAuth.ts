import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { rateLimiter } from "./rateLimits";
import { assertServer, secretArg } from "./serverAuth";

/**
 * Magic-link tokens. The Next.js server generates the random token, emails the
 * plaintext, and only ever sends us its SHA-256 hash — so this table is
 * useless to anyone who reads it.
 *
 * The email allowlist is NOT enforced here; it lives in the Next.js
 * `ADMIN_EMAILS` env var so access can be granted or revoked by editing an
 * environment variable, and is re-checked on every admin request.
 */

export const createLoginToken = mutation({
  args: {
    ...secretArg,
    email: v.string(),
    tokenHash: v.string(),
    expiresAt: v.number(),
  },
  handler: async (ctx, args) => {
    assertServer(args.secret);

    const perEmail = await rateLimiter.limit(ctx, "adminLinkPerEmail", {
      key: args.email,
    });
    if (!perEmail.ok) {
      return { status: "rate_limited" as const, retryAfter: perEmail.retryAfter };
    }
    const global = await rateLimiter.limit(ctx, "adminLinkGlobal");
    if (!global.ok) {
      return { status: "rate_limited" as const, retryAfter: global.retryAfter };
    }

    // Requesting a fresh link invalidates any earlier outstanding one, so a
    // forwarded or leaked old email stops working.
    const outstanding = await ctx.db
      .query("adminLoginTokens")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .order("desc")
      .take(20);
    for (const row of outstanding) {
      await ctx.db.delete("adminLoginTokens", row._id);
    }

    await ctx.db.insert("adminLoginTokens", {
      email: args.email,
      tokenHash: args.tokenHash,
      expiresAt: args.expiresAt,
    });
    return { status: "sent" as const };
  },
});

export const consumeLoginToken = mutation({
  args: { ...secretArg, tokenHash: v.string() },
  handler: async (ctx, args) => {
    assertServer(args.secret);

    const token = await ctx.db
      .query("adminLoginTokens")
      .withIndex("by_tokenHash", (q) => q.eq("tokenHash", args.tokenHash))
      .unique();

    if (!token) return { status: "invalid" as const };

    // Single use: burn it whatever the outcome, so a replay can't succeed.
    await ctx.db.delete("adminLoginTokens", token._id);

    if (token.usedAt !== undefined) return { status: "invalid" as const };
    if (Date.now() > token.expiresAt) return { status: "expired" as const };

    return { status: "ok" as const, email: token.email };
  },
});
