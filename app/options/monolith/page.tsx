import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { OptionsPill } from "../OptionsPill";

export const metadata: Metadata = {
  title: "Option 2 · Monolith",
};

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/training", label: "Training" },
  { href: "/contact", label: "Contact" },
];

const practices = [
  {
    name: "Management consulting",
    detail:
      "Strategy, diagnostics, and value chain development. CEFE, ValueLinks, ITC BMS.",
  },
  {
    name: "BPO & HR services",
    detail:
      "Recruitment, payroll, compliance — dependable back-office capacity in Ethiopia.",
  },
  {
    name: "Renewable energy",
    detail:
      "Ketir Solar: last-mile solar equipment for rural enterprises that need power to work.",
  },
  {
    name: "Dietetic counselling",
    detail:
      "Bekidmia: workplace nutrition, because a healthy team precedes a healthy business.",
  },
];

const proof = [
  { partner: "CDE (ACP/EU)", period: "2006–2013" },
  { partner: "USADF · Power Africa", period: "2014–2018" },
  { partner: "International Trade Centre", period: "since 2007" },
  { partner: "GIZ · CEFE International", period: "ongoing" },
  { partner: "UN Women · World Bank · SNV", period: "programs" },
];

export default function MonolithPage() {
  return (
    <div
      className="min-h-screen bg-[#04081c] text-white"
      style={{ fontFamily: "var(--font-geist-sans)" }}
    >
      <header className="border-b border-white/15">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/options/monolith"
            className="text-sm font-bold uppercase tracking-widest"
          >
            BCaD
          </Link>
          <nav className="flex items-center gap-7 text-sm">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="hidden text-white/60 transition hover:text-white sm:inline"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/register"
              className="text-[#e9b949] transition hover:text-[#f2ca62]"
            >
              Register →
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero — type is the monument */}
        <section className="mx-auto flex max-w-6xl flex-col justify-end px-6 pb-16 pt-20 sm:min-h-[78vh] sm:pb-20 sm:pt-28">
          <p className="text-sm text-white/60">
            Consulting · Training · Energy · Ethiopia and beyond
          </p>
          <h1 className="mt-6 max-w-5xl text-[clamp(2.6rem,7.5vw,6rem)] font-extralight leading-[1.02] tracking-[-0.02em]">
            Problems into
            <br />
            <span className="font-semibold">opportunities.</span>
          </h1>
          <div className="mt-12 grid gap-8 border-t border-[#e9b949]/60 pt-8 sm:grid-cols-[1fr_auto] sm:items-end">
            <p className="max-w-lg text-lg font-light leading-relaxed text-white/75">
              Since 1998, BCaD has helped entrepreneurs start well, enterprises
              compete, and development programs reach the people they&rsquo;re
              meant for — across every regional state of Ethiopia and six
              African countries.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-3 self-start text-sm font-semibold uppercase tracking-widest text-[#e9b949] transition hover:gap-5 sm:self-end"
            >
              Our services <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        {/* Practices — flush index, no cards */}
        <section className="border-t border-white/15">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-white/50">
              Four practices
            </h2>
            <div className="mt-10">
              {practices.map((p, i) => (
                <Link
                  key={p.name}
                  href="/services"
                  className={`group grid gap-3 py-8 transition sm:grid-cols-[1fr_1.2fr_auto] sm:items-baseline sm:gap-10 ${
                    i > 0 ? "border-t border-white/15" : "pt-0"
                  }`}
                >
                  <h3 className="text-2xl font-light tracking-tight transition group-hover:text-[#e9b949] sm:text-3xl">
                    {p.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60">
                    {p.detail}
                  </p>
                  <span
                    aria-hidden
                    className="hidden text-white/40 transition group-hover:translate-x-2 group-hover:text-[#e9b949] sm:block"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Photo band with statement */}
        <section className="relative">
          <div className="relative h-[50vh] min-h-[360px]">
            <Image
              src="https://images.unsplash.com/photo-1603128167392-e6a8863ec221?auto=format&fit=crop&w=2400&q=80"
              alt="People walking through Addis Ababa during the day"
              fill
              sizes="100vw"
              className="object-cover opacity-45"
            />
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto w-full max-w-6xl px-6">
                <p className="max-w-3xl text-[clamp(1.6rem,3.5vw,2.8rem)] font-light leading-snug">
                  Thousands of enterprising Ethiopians — from market-stall
                  owners to exporters — have been through our training and
                  advisory work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Proof ledger */}
        <section className="border-t border-white/15">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
              <div>
                <h2 className="text-3xl font-light tracking-tight">
                  Trusted with the
                  <br />
                  <span className="font-semibold">hard programs.</span>
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-white/60">
                  Development work is judged by what actually reaches people.
                  These partnerships are how we&rsquo;re judged.
                </p>
              </div>
              <ul>
                {proof.map((p, i) => (
                  <li
                    key={p.partner}
                    className={`flex items-baseline justify-between gap-6 py-4 ${
                      i > 0 ? "border-t border-white/15" : "pt-0"
                    }`}
                  >
                    <span className="font-medium">{p.partner}</span>
                    <span className="text-sm text-[#e9b949]">{p.period}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA monolith */}
        <section className="border-t border-[#e9b949]/60">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#e9b949]">
              Now enrolling
            </p>
            <h2 className="mt-4 max-w-3xl text-[clamp(2rem,5vw,3.6rem)] font-light leading-[1.08] tracking-tight">
              Building a <span className="font-semibold">Purpose-Driven</span>{" "}
              Business
            </h2>
            <p className="mt-6 max-w-xl text-white/70">
              Four weeks. Small cohort. A business plan you can act on. In
              person in Nuna or live online.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="/register"
                className="bg-[#e9b949] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-[#04081c] transition hover:bg-[#f2ca62]"
              >
                Reserve a seat
              </Link>
              <Link
                href="/contact"
                className="text-sm text-white/70 underline underline-offset-4 transition hover:text-white"
              >
                Or talk to us about a project
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 px-6 py-8 text-sm text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} BCaD Consulting Management PLC</p>
          <p>
            Addis Ababa ·{" "}
            <a href="tel:+251114712993" className="hover:text-white">
              +251 11 471 2993
            </a>{" "}
            ·{" "}
            <a
              href="mailto:bcadconsulting@gmail.com"
              className="hover:text-white"
            >
              bcadconsulting@gmail.com
            </a>
          </p>
        </div>
      </footer>

      <OptionsPill current="Monolith" />
    </div>
  );
}
