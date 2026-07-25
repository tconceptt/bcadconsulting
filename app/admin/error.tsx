"use client";

import { useEffect } from "react";

/**
 * The admin pages read from Convex on every request. A transient network
 * hiccup would otherwise surface as a raw crash, so give the team a retry
 * button instead — nothing here is unrecoverable.
 */
export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[color:var(--ks-soft)] px-4 py-24 text-center">
      <p className="font-display text-sm font-semibold text-[color:var(--ks-gold-deep)]">
        Something went wrong
      </p>
      <h1 className="mt-3 font-display text-2xl font-bold tracking-[-0.02em] text-[color:var(--ks-navy)]">
        We couldn&rsquo;t load the registrations.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-[color:var(--ks-ink)]">
        This is usually a brief connection problem — no registration data is
        lost. Try again, and if it keeps happening check that the Convex
        deployment is reachable.
      </p>
      {error.digest && (
        <p className="mt-2 font-mono text-xs text-[color:var(--ks-ink)]/60">
          Reference: {error.digest}
        </p>
      )}
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex items-center bg-[color:var(--ks-blue)] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--ks-navy)]"
      >
        Try again
      </button>
    </main>
  );
}
