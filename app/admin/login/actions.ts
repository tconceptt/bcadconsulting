"use server";

import { createHash, randomBytes } from "node:crypto";
import { headers } from "next/headers";
import { Resend } from "resend";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { serverSecret } from "@/app/lib/convexServer";
import { isAllowedAdmin } from "@/app/lib/adminSession";

export type LoginState = {
  status: "idle" | "sent" | "error";
  message: string;
};

const TOKEN_TTL_MS = 15 * 60 * 1000;

/**
 * Always shown on success, whether or not the address is on the allowlist —
 * so this form can't be used to discover who the site's admins are.
 */
const GENERIC_SENT =
  "If that address is on the admin list, a sign-in link is on its way. It expires in 15 minutes.";

async function siteOrigin(): Promise<string> {
  const headerList = await headers();
  const host = headerList.get("host");
  if (!host) return "https://www.bcadconsult.com";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}

export async function requestLoginLink(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = (formData.get("email") ?? "").toString().trim().toLowerCase();

  if (!email) {
    return { status: "error", message: "Please enter your email address." };
  }

  if (!isAllowedAdmin(email)) {
    // Deliberately indistinguishable from the success path.
    return { status: "sent", message: GENERIC_SENT };
  }

  const token = randomBytes(32).toString("base64url");
  const tokenHash = createHash("sha256").update(token).digest("hex");

  try {
    const result = await fetchMutation(api.adminAuth.createLoginToken, {
      secret: serverSecret(),
      email,
      tokenHash,
      expiresAt: Date.now() + TOKEN_TTL_MS,
    });

    if (result.status === "rate_limited") {
      return {
        status: "error",
        message:
          "Too many sign-in links have been requested for that address. Please wait a few minutes and try again.",
      };
    }

    const url = `${await siteOrigin()}/admin/verify?token=${token}`;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "BCaD Admin <noreply@bcadconsult.com>",
      to: email,
      subject: "Your BCaD admin sign-in link",
      html: `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;font-size:15px;line-height:1.6;color:#0f172a">
  <h2 style="margin:0 0 16px;font-size:20px">Sign in to BCaD admin</h2>
  <p style="margin:0 0 20px">
    Click the button below to open the training registrations dashboard. The
    link works once and expires in 15 minutes.
  </p>
  <p style="margin:0 0 24px">
    <a href="${url}" style="display:inline-block;background:#1E5AA8;color:#ffffff;text-decoration:none;padding:12px 22px;font-weight:600;border-radius:3px">Open registrations</a>
  </p>
  <p style="margin:0 0 8px;font-size:13px;color:#64748b">
    If the button doesn't work, paste this into your browser:
  </p>
  <p style="margin:0 0 20px;font-size:13px;word-break:break-all;color:#1d4ed8">${url}</p>
  <p style="margin:0;font-size:13px;color:#64748b">
    If you didn't request this, you can ignore this email — nobody can sign in without the link.
  </p>
</div>`,
    });

    if (error) throw error;
  } catch (error) {
    console.error("[BCaD admin] sign-in link failed:", error);
    return {
      status: "error",
      message:
        "Sorry — we couldn't send the sign-in link just now. Please try again in a moment.",
    };
  }

  return { status: "sent", message: GENERIC_SENT };
}
