import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Design options",
};

const options = [
  {
    n: 1,
    href: "/options/meridian",
    name: "Meridian",
    lane: "Polished consulting",
    thesis:
      "Editorial authority on white. Serif statements, hairline rules, one full-bleed photograph of Addis. The McKinsey posture: quiet, expensive, certain.",
    swatches: ["#ffffff", "#101426", "#b8860b"],
  },
  {
    n: 2,
    href: "/options/monolith",
    name: "Monolith",
    lane: "Polished consulting",
    thesis:
      "Drenched near-black navy, monumental thin-vs-bold type, gold hairlines. Reads like a premium strategy house — imposing, not flashy.",
    swatches: ["#04081c", "#e9b949", "#ffffff"],
  },
  {
    n: 3,
    href: "/options/ledger",
    name: "Ledger",
    lane: "Polished consulting",
    thesis:
      "Swiss annual-report precision: real tables, tabular numerals, sharp corners, a single red accent. The firm as a matter of record.",
    swatches: ["#fafbfd", "#14161f", "#d92f2f"],
  },
  {
    n: 4,
    href: "/options/highland",
    name: "Highland",
    lane: "Warm & bold",
    thesis:
      "Committed gold. A saturated, optimistic surface with market and coffee photography — consulting that sounds like Ethiopia, not like an airport lounge.",
    swatches: ["#e3aa1a", "#231a05", "#ffffff"],
  },
  {
    n: 5,
    href: "/options/signal",
    name: "Signal",
    lane: "Contemporary",
    thesis:
      "Asymmetric split-screen in electric blue, verb-led sections ('Start something. Fix something. Run something.'). The youngest, most digital voice.",
    swatches: ["#ffffff", "#2a55c9", "#0c1022"],
  },
  {
    n: 6,
    href: "/options/keystone",
    name: "Keystone",
    lane: "On-brand",
    thesis:
      "The brand manual as a flagship. Navy-drenched, Montserrat-led, with the key drawn in line art and built from the page itself — a photograph for its bow, a gold bar for its shaft. Teal carries the training chapter; the tone is institutional weight with an entrepreneurial pulse.",
    swatches: ["#0f2c4c", "#1fa7a0", "#daa857"],
  },
];

export default function OptionsPage() {
  return (
    <main
      className="min-h-screen bg-white text-[#111]"
      style={{ fontFamily: "var(--font-geist-sans)" }}
    >
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <p className="text-sm font-medium text-[#666]">
          BCaD Consulting · homepage design study
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Six directions. Pick one.
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-[#444]">
          Each option is a complete homepage built with real BCaD content —
          same substance, six different postures. Options 1–3 aim squarely at
          the polished-consulting register; 4 and 5 take more risk; 6 follows
          the official brand standards to the letter. All links inside each
          option lead to the real site pages.
        </p>

        <ol className="mt-12">
          {options.map((o, i) => (
            <li key={o.href}>
              <Link
                href={o.href}
                className={`group grid gap-4 py-8 transition sm:grid-cols-[3rem_1fr_auto] sm:items-baseline sm:gap-8 ${
                  i > 0 ? "border-t border-[#111]/10" : "pt-0"
                }`}
              >
                <span className="text-2xl font-semibold tabular-nums text-[#bbb] transition group-hover:text-[#111]">
                  {o.n}
                </span>
                <span>
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-xl font-semibold tracking-tight group-hover:underline group-hover:underline-offset-4">
                      {o.name}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-wide text-[#888]">
                      {o.lane}
                    </span>
                  </span>
                  <span className="mt-2 block max-w-xl text-sm leading-relaxed text-[#555]">
                    {o.thesis}
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  {o.swatches.map((s) => (
                    <span
                      key={s}
                      aria-hidden
                      className="block h-5 w-5 rounded-full border border-[#111]/15"
                      style={{ backgroundColor: s }}
                    />
                  ))}
                  <span
                    aria-hidden
                    className="ml-3 hidden text-[#bbb] transition group-hover:translate-x-1 group-hover:text-[#111] sm:block"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <p className="mt-12 border-t border-[#111]/10 pt-8 text-sm text-[#666]">
          For reference:{" "}
          <Link
            href="/"
            className="font-medium text-[#111] underline underline-offset-4"
          >
            the current homepage
          </Link>
          . This page is unlisted and excluded from search indexing.
        </p>
      </div>
    </main>
  );
}
