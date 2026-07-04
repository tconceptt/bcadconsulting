import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Familjen_Grotesk } from "next/font/google";
import { OptionsPill } from "../OptionsPill";

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-signal",
});

export const metadata: Metadata = {
  title: "Option 5 · Signal",
};

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/training", label: "Training" },
  { href: "/contact", label: "Contact" },
];

const clients = [
  "USAID",
  "World Bank",
  "UN Women",
  "GIZ",
  "SNV",
  "ITC",
  "USADF",
  "CARE Ethiopia",
];

const moves = [
  {
    title: "Start something",
    body: "Entrepreneurship training and coaching that takes you from idea to actionable business plan — built on the CEFE methodology we've run since 1998.",
    href: "/training",
    cta: "The 4-week intensive",
  },
  {
    title: "Fix something",
    body: "Business diagnosis, strategy, and value chain development for enterprises that need to compete — with tools from GIZ, ITC, and ValueLinks International.",
    href: "/services",
    cta: "Consulting services",
  },
  {
    title: "Run something",
    body: "HR outsourcing, payroll, recruitment, and compliance. And for rural businesses: solar equipment through Ketir Solar's last-mile network.",
    href: "/services",
    cta: "Operations & energy",
  },
];

export default function SignalPage() {
  return (
    <div
      className={`${familjen.variable} min-h-screen bg-white text-[#0c1022]`}
      style={{ fontFamily: "var(--font-signal)" }}
    >
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[88rem] items-center justify-between px-6 py-4">
          <Link
            href="/options/signal"
            className="text-lg font-bold tracking-tight"
          >
            BCaD<span className="text-[#2a55c9]">.</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="hidden text-[#0c1022]/60 transition hover:text-[#0c1022] sm:inline"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/register"
              className="rounded-md bg-[#2a55c9] px-4 py-2.5 text-white transition hover:bg-[#1e42a8]"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Split hero */}
        <section className="mx-auto grid max-w-[88rem] lg:min-h-[82vh] lg:grid-cols-[1.15fr_1fr]">
          <div className="flex flex-col justify-center px-6 py-16 lg:py-10 lg:pr-16">
            <p className="font-medium text-[#2a55c9]">
              Addis Ababa · since 1998
            </p>
            <h1 className="mt-4 text-[clamp(2.6rem,5.5vw,4.6rem)] font-bold leading-[1.03] tracking-tight">
              The consulting firm for economies that are still being built.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#454b63]">
              BCaD helps entrepreneurs start, enterprises compete, and
              development programs deliver — in Ethiopia and across Africa.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                href="/services"
                className="rounded-md bg-[#0c1022] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#232a4a]"
              >
                What we do
              </Link>
              <Link
                href="/training"
                className="text-sm font-semibold text-[#2a55c9] hover:underline"
              >
                Entrepreneurship training →
              </Link>
            </div>
          </div>
          <div className="relative min-h-[320px] bg-[#2a55c9] lg:min-h-0">
            <Image
              src="https://images.unsplash.com/photo-1626598442658-ea6a1a5943df?auto=format&fit=crop&w=1400&q=80"
              alt="People walking past buildings in Addis Ababa"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover mix-blend-luminosity opacity-90"
            />
            <div className="absolute bottom-0 left-0 bg-white px-5 py-4">
              <p className="text-sm font-semibold">
                7 countries · every Ethiopian region
              </p>
            </div>
          </div>
        </section>

        {/* Client marquee */}
        <section
          aria-label="Clients and partners"
          className="overflow-hidden border-y border-[#0c1022]/10 bg-white py-5"
        >
          <div className="flex flex-wrap items-baseline justify-center gap-x-10 gap-y-2 px-6 text-sm font-medium text-[#454b63]">
            <span className="font-semibold text-[#0c1022]">
              Trusted by:
            </span>
            {clients.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </section>

        {/* Three moves — verb-led, alternating offsets */}
        <section className="mx-auto max-w-[88rem] px-6 py-16 sm:py-24">
          <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Come to us with a verb, not a brief.
          </h2>
          <div className="mt-14 space-y-14">
            {moves.map((m, i) => (
              <div
                key={m.title}
                className={`grid gap-6 lg:grid-cols-2 lg:gap-20 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <h3 className="text-[clamp(2rem,4vw,3.2rem)] font-bold leading-none tracking-tight text-[#2a55c9]">
                  {m.title}
                </h3>
                <div>
                  <p className="max-w-xl text-lg leading-relaxed text-[#454b63]">
                    {m.body}
                  </p>
                  <Link
                    href={m.href}
                    className="mt-4 inline-block text-sm font-semibold text-[#0c1022] underline decoration-[#2a55c9] decoration-2 underline-offset-4 hover:text-[#2a55c9]"
                  >
                    {m.cta} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Proof band */}
        <section className="bg-[#0c1022] text-white">
          <div className="mx-auto grid max-w-[88rem] gap-12 px-6 py-16 sm:py-24 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Twenty-five years of programs that had to work.
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-white/70">
                Technical Intervention Office for the EU&rsquo;s CDE program.
                USADF&rsquo;s partner on Power Africa off-grid energy.
                ITC&rsquo;s enterprise competitiveness tools. GIZ&rsquo;s CEFE
                methodology for Ethiopia and Africa. Development work is judged
                by what reaches people — that&rsquo;s the standard we&rsquo;re
                used to.
              </p>
              <Link
                href="/about"
                className="mt-7 inline-block rounded-md border border-white/30 px-6 py-3 text-sm font-semibold transition hover:bg-white hover:text-[#0c1022]"
              >
                About the firm
              </Link>
            </div>
            <div className="relative min-h-[280px] overflow-hidden rounded-lg lg:min-h-0">
              <Image
                src="https://images.unsplash.com/photo-1603128167392-e6a8863ec221?auto=format&fit=crop&w=1400&q=80"
                alt="A busy daytime street scene in Addis Ababa"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-[88rem] px-6 py-16 sm:py-24">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <h2 className="text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.05] tracking-tight">
              What are you building?{" "}
              <span className="text-[#2a55c9]">Tell us.</span>
            </h2>
            <div className="flex flex-wrap gap-4 lg:justify-end">
              <Link
                href="/contact"
                className="rounded-md bg-[#2a55c9] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1e42a8]"
              >
                Start a conversation
              </Link>
              <Link
                href="/register"
                className="rounded-md border border-[#0c1022]/20 px-7 py-3.5 text-sm font-semibold transition hover:border-[#0c1022]"
              >
                Join the training
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#0c1022]/10">
        <div className="mx-auto flex max-w-[88rem] flex-col justify-between gap-3 px-6 py-8 text-sm text-[#454b63] sm:flex-row">
          <p>© {new Date().getFullYear()} BCaD Consulting Management PLC</p>
          <p>
            Addis Ababa ·{" "}
            <a href="tel:+251114712993" className="hover:text-[#0c1022]">
              +251 11 471 2993
            </a>{" "}
            ·{" "}
            <a
              href="mailto:bcadconsulting@gmail.com"
              className="hover:text-[#0c1022]"
            >
              bcadconsulting@gmail.com
            </a>
          </p>
        </div>
      </footer>

      <OptionsPill current="Signal" />
    </div>
  );
}
