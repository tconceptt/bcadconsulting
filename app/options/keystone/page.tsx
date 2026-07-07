import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Montserrat, Source_Sans_3 } from "next/font/google";
import { OptionsPill } from "../OptionsPill";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-keystone-display",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-keystone-body",
});

export const metadata: Metadata = {
  title: "Option 6 · Keystone",
};

// Brand standards palette
const NAVY = "#0F2C4C";
const NAVY_DEEP = "#0A2038";
const BLUE = "#1E5AA8";
const GOLD = "#DAA857";
const TEAL = "#1FA7A0";
const SOFT = "#F5F6F8";
const INK = "#3d4e66"; // navy-tinted body ink on white, ≥4.5:1

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/training", label: "Training" },
  { href: "/contact", label: "Contact" },
];

const practices = [
  {
    n: "01",
    name: "Management consulting",
    body: "Business diagnosis, strategy, and value chain development with internationally anchored tools — CEFE, ValueLinks, and ITC's Business Management Systems.",
  },
  {
    n: "02",
    name: "BPO & HR services",
    body: "Recruitment, payroll, compliance, and back-office capacity for organizations that need dependable operations in Ethiopia.",
  },
  {
    n: "03",
    name: "Renewable energy",
    body: "Ketir Solar imports and distributes solar equipment to rural areas where electricity is what stands between a family and a working business.",
  },
  {
    n: "04",
    name: "Dietetic counselling",
    body: "Bekidmia — 'first things first' in Amharic — helps individuals and workplaces eat well enough to work well.",
  },
];

const engagements = [
  {
    period: "2006 – 2013",
    partner: "CDE (ACP/EU)",
    role: "Technical Intervention Office for Ethiopia under the EU's private sector development program.",
  },
  {
    period: "2014 – 2018",
    partner: "USADF · Power Africa",
    role: "Technical partner delivering support and monitoring for off-grid energy across Ethiopia.",
  },
  {
    period: "Since 2007",
    partner: "International Trade Centre",
    role: "Business diagnostics, supply chain learning, and export readiness for African women entrepreneurs.",
  },
  {
    period: "Ongoing",
    partner: "GIZ · CEFE International",
    role: "Partner promoting the CEFE entrepreneurship methodology in Ethiopia and Africa.",
  },
];

const partners = [
  "USAID",
  "World Bank",
  "UN Women",
  "GIZ",
  "SNV",
  "ITC",
  "USADF",
  "CARE Ethiopia",
];

/**
 * The brand key, drawn as line art. `draw` animates the stroke on page load
 * (globals.css collapses the animation under prefers-reduced-motion).
 */
function KeyLineArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <circle cx="52" cy="60" r="34" pathLength={1} className="ks-draw" />
      <circle
        cx="52"
        cy="60"
        r="16"
        pathLength={1}
        className="ks-draw ks-draw-2"
      />
      <path
        d="M86 60h218M232 60v26M262 60v38M292 60v26"
        pathLength={1}
        className="ks-draw ks-draw-3"
      />
    </svg>
  );
}

export default function KeystonePage() {
  return (
    <div
      className={`${montserrat.variable} ${sourceSans.variable} min-h-screen bg-white`}
      style={{ fontFamily: "var(--font-keystone-body)", color: NAVY }}
    >
      <style>{`
        @keyframes ks-rise {
          from { opacity: 0; transform: translateY(26px); }
          to { opacity: 1; transform: none; }
        }
        .ks-rise { animation: ks-rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .ks-rise-2 { animation-delay: 0.12s; }
        .ks-rise-3 { animation-delay: 0.24s; }
        .ks-rise-4 { animation-delay: 0.38s; }
        @keyframes ks-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        .ks-draw {
          stroke-dasharray: 1;
          animation: ks-draw 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
        }
        .ks-draw-2 { animation-delay: 0.55s; }
        .ks-draw-3 { animation-delay: 0.8s; }
        .ks-row .ks-arrow { opacity: 0; transform: translateX(-8px); transition: opacity 0.25s, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1); }
        .ks-row:hover .ks-arrow, .ks-row:focus-visible .ks-arrow { opacity: 1; transform: none; }
        .ks-row .ks-name { transition: color 0.25s; }
        .ks-row:hover .ks-name, .ks-row:focus-visible .ks-name { color: ${BLUE}; }
        .ks-btn { transition: transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), filter 0.2s; }
        .ks-btn:hover { transform: translateY(-2px); filter: brightness(1.06); }
      `}</style>

      {/* Masthead — white paper over navy, sealed with the gold keyline */}
      <header
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm"
        style={{ borderBottom: `3px solid ${GOLD}` }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link href="/options/keystone" className="flex items-center">
            <Image
              src="/bcad-new.jpeg"
              alt="BCaD Consulting Management PLC — Spurring Innovation and Entrepreneurship"
              width={1280}
              height={700}
              priority
              className="-my-3 h-16 w-auto"
            />
          </Link>
          <nav className="flex items-center gap-7 text-sm font-medium">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="hidden transition-colors hover:text-[#1E5AA8] sm:inline"
                style={{ color: INK }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/register"
              className="ks-btn px-5 py-2.5 font-semibold text-white"
              style={{
                backgroundColor: BLUE,
                fontFamily: "var(--font-keystone-display)",
              }}
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero — navy drench, the key drawing itself across the dark */}
        <section
          className="relative overflow-hidden text-white"
          style={{
            background: `radial-gradient(ellipse 120% 90% at 20% 0%, #16416e 0%, ${NAVY} 55%)`,
          }}
        >
          <KeyLineArt className="pointer-events-none absolute -right-24 bottom-10 hidden w-[52rem] text-white/[0.14] lg:block" />
          <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 sm:pb-32 sm:pt-28">
            <h1
              className="ks-rise max-w-4xl text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.02] tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-keystone-display)" }}
            >
              Enterprise,
              <br />
              <span style={{ color: GOLD }}>unlocked.</span>
            </h1>
            <p className="ks-rise ks-rise-2 mt-8 max-w-xl text-lg leading-[1.75] text-white/80 sm:text-xl">
              Since 1998, BCaD Consulting has helped Ethiopian entrepreneurs,
              enterprises, and development programs turn locked potential into
              working businesses.
            </p>
            <div className="ks-rise ks-rise-3 mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/services"
                className="ks-btn px-8 py-4 text-sm font-semibold"
                style={{
                  backgroundColor: GOLD,
                  color: NAVY,
                  fontFamily: "var(--font-keystone-display)",
                }}
              >
                What we do
              </Link>
              <Link
                href="/training"
                className="ks-btn border border-white/40 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10"
                style={{ fontFamily: "var(--font-keystone-display)" }}
              >
                Entrepreneurship training
              </Link>
            </div>
            <p className="ks-rise ks-rise-4 mt-16 max-w-md text-sm leading-relaxed text-white/55">
              Management consulting · BPO &amp; HR · Renewable energy ·
              Dietetics — from Addis Ababa, across seven African countries.
            </p>
          </div>
        </section>

        {/* The claim + the practice index — white, typographic */}
        <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <p
            className="max-w-3xl text-2xl font-medium leading-[1.5] sm:text-3xl"
            style={{ fontFamily: "var(--font-keystone-display)" }}
          >
            Development work is judged by what actually reaches people.{" "}
            <span style={{ color: BLUE }}>So is a consulting firm.</span>
          </p>
          <p
            className="mt-6 max-w-2xl text-lg leading-[1.75]"
            style={{ color: INK }}
          >
            We&rsquo;ve carried the EU&rsquo;s private sector program, powered
            USADF&rsquo;s off-grid energy work, and trained thousands of
            entrepreneurs across every Ethiopian region — one working business
            at a time. Four practices, one standard.
          </p>

          <div className="mt-16">
            {practices.map((p) => (
              <Link
                key={p.n}
                href="/services"
                className="ks-row group grid gap-x-8 gap-y-2 border-t py-8 sm:grid-cols-[4rem_1fr_auto] sm:items-center"
                style={{ borderColor: `${NAVY}1f` }}
              >
                <span
                  className="text-sm font-semibold tabular-nums"
                  style={{ color: `${NAVY}66` }}
                >
                  {p.n}
                </span>
                <span>
                  <span
                    className="ks-name block text-[clamp(1.5rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.01em]"
                    style={{ fontFamily: "var(--font-keystone-display)" }}
                  >
                    {p.name}
                  </span>
                  <span
                    className="mt-2 block max-w-2xl leading-relaxed"
                    style={{ color: INK }}
                  >
                    {p.body}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="ks-arrow hidden text-2xl sm:block"
                  style={{ color: GOLD }}
                >
                  →
                </span>
              </Link>
            ))}
            <div style={{ borderTop: `1px solid ${NAVY}1f` }} />
          </div>
        </section>

        {/* Track record — navy, the key built from the page itself */}
        <section className="text-white" style={{ backgroundColor: NAVY }}>
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
            <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
              <div>
                <h2
                  className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl"
                  style={{ fontFamily: "var(--font-keystone-display)" }}
                >
                  Trusted with the{" "}
                  <span style={{ color: GOLD }}>hard programs.</span>
                </h2>
                <p className="mt-5 max-w-md leading-[1.75] text-white/75">
                  When funders need a partner who can reach the last mile —
                  rural energy, women&rsquo;s enterprise, displaced people
                  starting again — they&rsquo;ve called us. For 27 years.
                </p>

                {/* The bow of the key is a real entrepreneur; the shaft is the page */}
                <figure className="mt-12">
                  <div className="relative flex items-center">
                    <div
                      className="relative aspect-square w-48 flex-shrink-0 overflow-hidden rounded-full sm:w-60"
                      style={{ boxShadow: `0 0 0 3px ${GOLD}` }}
                    >
                      <Image
                        src="https://images.unsplash.com/photo-1572851569977-e18b9ea6edbe?auto=format&fit=crop&w=900&q=80"
                        alt="Produce stalls on a busy Ethiopian market street — the kind of enterprise BCaD exists to unlock"
                        fill
                        sizes="(max-width: 640px) 192px, 240px"
                        className="object-cover"
                        style={{ filter: "grayscale(35%) contrast(1.05)" }}
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 mix-blend-multiply"
                        style={{ backgroundColor: `${NAVY}55` }}
                      />
                    </div>
                    <div
                      aria-hidden
                      className="relative h-[10px] min-w-0 flex-1"
                      style={{ backgroundColor: GOLD }}
                    >
                      <span
                        className="absolute right-10 top-0 h-8 w-[10px]"
                        style={{ backgroundColor: GOLD }}
                      />
                      <span
                        className="absolute right-0 top-0 h-12 w-[10px]"
                        style={{ backgroundColor: GOLD }}
                      />
                    </div>
                  </div>
                  <figcaption className="mt-4 text-sm text-white/55">
                    Enterprise is the key. Everything we do exists to turn it.
                  </figcaption>
                </figure>
              </div>

              <div className="lg:pt-2">
                {engagements.map((t, i) => (
                  <div
                    key={t.partner}
                    className={`py-6 ${i > 0 ? "border-t border-white/15" : "pt-0"}`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3
                        className="text-lg font-bold"
                        style={{ fontFamily: "var(--font-keystone-display)" }}
                      >
                        {t.partner}
                      </h3>
                      <p
                        className="text-sm font-semibold tabular-nums"
                        style={{ color: GOLD }}
                      >
                        {t.period}
                      </p>
                    </div>
                    <p className="mt-2 max-w-xl leading-relaxed text-white/75">
                      {t.role}
                    </p>
                  </div>
                ))}
                <p className="mt-8 border-t border-white/15 pt-6 leading-loose text-white/60">
                  In the field with{" "}
                  {partners.map((c, i) => (
                    <span key={c} className="whitespace-nowrap">
                      <span className="font-semibold text-white/85">{c}</span>
                      {i < partners.length - 1 && (
                        <span aria-hidden style={{ color: GOLD }}>
                          {" · "}
                        </span>
                      )}
                    </span>
                  ))}
                  {" "}— and thousands of enterprising Ethiopians through
                  their programs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Training — drenched in Entrepreneurship Teal, the color earning its name */}
        <section style={{ backgroundColor: TEAL, color: NAVY }}>
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:py-28 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
            <div>
              <h2
                className="max-w-2xl text-[clamp(2.2rem,4.5vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.015em]"
                style={{ fontFamily: "var(--font-keystone-display)" }}
              >
                Got a business idea that won&rsquo;t leave you alone?
              </h2>
              <p className="mt-6 max-w-xl text-lg font-medium leading-[1.7]">
                <strong>Building a Purpose-Driven Business</strong> is our
                four-week intensive for aspiring entrepreneurs. Find the idea
                worth your life — and leave with a business plan you can act
                on. Small cohorts, real coaching, 27 years of method behind it.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/register"
                  className="ks-btn px-8 py-4 text-sm font-semibold text-white"
                  style={{
                    backgroundColor: NAVY,
                    fontFamily: "var(--font-keystone-display)",
                  }}
                >
                  Reserve your seat
                </Link>
                <Link
                  href="/training"
                  className="text-sm font-semibold underline decoration-2 underline-offset-4"
                  style={{ fontFamily: "var(--font-keystone-display)" }}
                >
                  Course details
                </Link>
              </div>
            </div>
            <div
              className="relative hidden aspect-[4/5] overflow-hidden lg:block"
              style={{ boxShadow: `12px 12px 0 0 ${NAVY}` }}
            >
              <Image
                src="https://images.unsplash.com/photo-1630861412757-d9743d318312?auto=format&fit=crop&w=1000&q=80"
                alt="Hands pouring coffee during an Ethiopian coffee ceremony — craft, patience, and enterprise in one ritual"
                fill
                sizes="(max-width: 1280px) 40vw, 480px"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Closing — white, one question */}
        <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <h2
              className="text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.08] tracking-[-0.015em]"
              style={{ fontFamily: "var(--font-keystone-display)" }}
            >
              What could you do with{" "}
              <span style={{ color: BLUE }}>the right key?</span>
            </h2>
            <div className="flex flex-wrap gap-4 lg:justify-end">
              <Link
                href="/contact"
                className="ks-btn px-8 py-4 text-sm font-semibold text-white"
                style={{
                  backgroundColor: BLUE,
                  fontFamily: "var(--font-keystone-display)",
                }}
              >
                Start a conversation
              </Link>
              <Link
                href="/services"
                className="ks-btn border px-8 py-4 text-sm font-semibold"
                style={{
                  borderColor: `${NAVY}4d`,
                  fontFamily: "var(--font-keystone-display)",
                }}
              >
                Explore our services
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer
        className="text-white"
        style={{ backgroundColor: NAVY_DEEP, borderTop: `3px solid ${GOLD}` }}
      >
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 px-6 py-8 text-sm text-white/65 sm:flex-row">
          <p>© {new Date().getFullYear()} BCaD Consulting Management PLC</p>
          <p>
            Lebu Commercial Center, Addis Ababa ·{" "}
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

      <OptionsPill current="Keystone" />
    </div>
  );
}
