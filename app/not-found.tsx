import Link from "next/link";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <p className="font-display text-sm font-semibold text-[color:var(--ks-gold-deep)]">
          404
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-[-0.02em] text-[color:var(--ks-navy)] sm:text-4xl">
          This page doesn&rsquo;t exist.
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-[color:var(--ks-ink)]">
          The link may be outdated or mistyped. Head back to the homepage, or
          reach us at{" "}
          <a
            href="mailto:info@bcadconsult.com"
            className="font-medium text-[color:var(--ks-blue)] hover:underline"
          >
            info@bcadconsult.com
          </a>{" "}
          if you were looking for something specific.
        </p>
        <Link
          href="/"
          className="ks-btn mt-8 inline-flex items-center px-7 py-3.5 font-display text-sm font-semibold text-[color:var(--ks-navy)]"
          style={{ backgroundColor: "var(--ks-gold)" }}
        >
          Back to homepage
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
