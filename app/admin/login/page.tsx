import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminEmail } from "@/app/lib/adminSession";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin sign-in",
  robots: { index: false, follow: false },
};

/** Reasons a magic link can bounce the user back here. */
const LINK_ERRORS: Record<string, string> = {
  missing: "That link was incomplete. Please request a new one.",
  invalid:
    "That sign-in link has already been used. Links work once — please request a new one.",
  expired: "That sign-in link has expired. Please request a new one.",
  not_allowed:
    "That address no longer has admin access. Contact the site owner if this is unexpected.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await getAdminEmail()) redirect("/admin");

  const { error } = await searchParams;
  const linkError = error ? LINK_ERRORS[error] : undefined;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[color:var(--ks-soft)] px-4 py-16">
      <div className="w-full max-w-sm border-t-[3px] border-[color:var(--ks-gold)] bg-white p-7 shadow-sm">
        <h1 className="font-display text-xl font-bold text-[color:var(--ks-navy)]">
          BCaD admin
        </h1>
        <p className="mt-1.5 mb-6 text-sm leading-relaxed text-[color:var(--ks-ink)]">
          Training registrations. Enter your work email and we&rsquo;ll send you
          a sign-in link — no password needed.
        </p>
        {linkError && (
          <p
            role="alert"
            className="mb-4 rounded-[4px] border border-[color:var(--ks-red)]/40 bg-[color:var(--ks-red)]/10 px-4 py-3 text-sm leading-relaxed text-[color:var(--ks-red)]"
          >
            {linkError}
          </p>
        )}
        <LoginForm />
      </div>
    </main>
  );
}
