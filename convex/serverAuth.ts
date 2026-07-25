/**
 * Every function in this deployment is reachable from the public internet at
 * the deployment URL, and this app has no Convex auth provider configured
 * (the admin session is a Next.js cookie, not a JWT Convex can verify).
 *
 * So rather than relying on the deployment URL staying secret, every function
 * takes a `secret` argument that only the Next.js server knows. The browser
 * never talks to Convex directly — all traffic goes through server actions and
 * route handlers — so no client ever needs this value.
 *
 * Set it with:  npx convex env set SERVER_SECRET "<value>"
 */
import { v } from "convex/values";

export const secretArg = { secret: v.string() };

/** Length-independent comparison, so a wrong secret leaks no prefix info. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export function assertServer(secret: string): void {
  const expected = process.env.SERVER_SECRET;
  if (!expected) {
    throw new Error(
      'SERVER_SECRET is not set on this Convex deployment. Run: npx convex env set SERVER_SECRET "<value>"',
    );
  }
  if (!safeEqual(secret, expected)) {
    throw new Error("Unauthorized");
  }
}
