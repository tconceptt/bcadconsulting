import "server-only";

/**
 * Convex functions in this app are guarded by a shared secret rather than by
 * an auth provider (see `convex/serverAuth.ts`), because the browser never
 * talks to Convex directly — every call goes through a server action or route
 * handler. Call sites pass `secret: serverSecret()` alongside their own args.
 */
export function serverSecret(): string {
  const secret = process.env.CONVEX_SERVER_SECRET;
  if (!secret) {
    throw new Error(
      "CONVEX_SERVER_SECRET is not set. It must match the SERVER_SECRET on the Convex deployment.",
    );
  }
  return secret;
}
