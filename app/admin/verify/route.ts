import { createHash } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { serverSecret } from "@/app/lib/convexServer";
import { buildSessionCookie, isAllowedAdmin } from "@/app/lib/adminSession";

/**
 * Lands here from the emailed magic link. Burns the single-use token, then
 * sets the session cookie and sends the admin on to the dashboard.
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const loginUrl = new URL("/admin/login", request.nextUrl.origin);

  if (!token) {
    loginUrl.searchParams.set("error", "missing");
    return NextResponse.redirect(loginUrl);
  }

  const tokenHash = createHash("sha256").update(token).digest("hex");

  const result = await fetchMutation(api.adminAuth.consumeLoginToken, {
    secret: serverSecret(),
    tokenHash,
  });

  if (result.status !== "ok") {
    loginUrl.searchParams.set("error", result.status);
    return NextResponse.redirect(loginUrl);
  }

  // The allowlist may have changed since the link was sent.
  if (!isAllowedAdmin(result.email)) {
    loginUrl.searchParams.set("error", "not_allowed");
    return NextResponse.redirect(loginUrl);
  }

  const cookie = await buildSessionCookie(result.email);
  const response = NextResponse.redirect(
    new URL("/admin", request.nextUrl.origin),
  );
  response.cookies.set(cookie.name, cookie.value, cookie.options);
  return response;
}
