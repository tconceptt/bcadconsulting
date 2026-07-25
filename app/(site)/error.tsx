"use client";

import { useEffect } from "react";

export default function Error({
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
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="font-display text-sm font-semibold text-[color:var(--ks-gold-deep)]">
        Something went wrong
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-[-0.02em] text-[color:var(--ks-navy)] sm:text-4xl">
        We hit a snag loading this page.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-[color:var(--ks-ink)]">
        Please try again — if it keeps happening, write to us at{" "}
        <a
          href="mailto:info@bcadconsult.com"
          className="font-medium text-[color:var(--ks-blue)] hover:underline"
        >
          info@bcadconsult.com
        </a>
        .
      </p>
      <button
        type="button"
        onClick={reset}
        className="ks-btn mt-8 inline-flex items-center px-7 py-3.5 font-display text-sm font-semibold text-[color:var(--ks-navy)]"
        style={{ backgroundColor: "var(--ks-gold)" }}
      >
        Try again
      </button>
    </main>
  );
}
