import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "bcad_admin_session";
const SESSION_DAYS = 30;

function encodedKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "SESSION_SECRET is not set. Generate one with: openssl rand -base64 32",
    );
  }
  return new TextEncoder().encode(secret);
}

/**
 * The allowlist lives in an environment variable rather than the database so
 * access can be granted or revoked by editing one Vercel setting, and it is
 * re-checked on every admin request — removing an address logs that person out
 * immediately, even if their cookie is still valid.
 */
export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowedAdmin(email: string): boolean {
  return adminEmails().includes(email.trim().toLowerCase());
}

/**
 * Builds the session cookie without setting it, so a Route Handler returning
 * its own redirect response can attach it explicitly.
 */
export async function buildSessionCookie(email: string) {
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const token = await new SignJWT({ email: email.toLowerCase() })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(encodedKey());

  return {
    name: COOKIE_NAME,
    value: token,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      expires: expiresAt,
      path: "/",
    },
  };
}

export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Returns the signed-in admin's email, or null. Verifies both the cookie
 * signature and current allowlist membership.
 */
export async function getAdminEmail(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, encodedKey(), {
      algorithms: ["HS256"],
    });
    const email = typeof payload.email === "string" ? payload.email : null;
    if (!email || !isAllowedAdmin(email)) return null;
    return email;
  } catch {
    return null;
  }
}

/**
 * Guard for anything that reads or writes registration data. Server Actions
 * are reachable by direct POST, not just through our own UI, so this must be
 * called inside every action — guarding the page alone is not enough.
 */
export async function requireAdmin(): Promise<string> {
  const email = await getAdminEmail();
  if (!email) redirect("/admin/login");
  return email;
}
