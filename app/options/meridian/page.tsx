import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Source_Serif_4 } from "next/font/google";
import { OptionsPill } from "../OptionsPill";

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-meridian",
});

export const metadata: Metadata = {
  title: "Option 1 · Meridian",
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
    body: "Business diagnosis, strategy, and value chain development with internationally anchored tools — CEFE, ValueLinks, and ITC's Business Management Systems.",
  },
  {
    name: "BPO & HR services",
    body: "Recruitment, payroll, compliance, and back-office capacity for organizations that need dependable operations in Ethiopia.",
  },
  {
    name: "Renewable energy",
    body: "Ketir Solar imports and distributes solar equipment to rural areas where electricity is what stands between a family and a working business.",
  },
  {
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

export default function MeridianPage() {
  return (
    <div
      className={`${serif.variable} min-h-screen bg-white text-[#101426]`}
      style={{ fontFamily: "var(--font-geist-sans)" }}
    >
      {/* Masthead */}
      <header className="border-b border-[#101426]/15">
        <div className="mx-auto flex max-w-5xl items-baseline justify-between px-6 py-5">
          <Link
            href="/options/meridian"
            className="text-lg font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-meridian)" }}
          >
            BCaD Consulting
          </Link>
          <nav className="flex items-baseline gap-6 text-sm">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="hidden text-[#101426]/70 transition hover:text-[#101426] sm:inline"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/register"
              className="border-b-2 border-[#b8860b] pb-0.5 font-medium text-[#101426]"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero — typographic statement over hairline */}
        <section className="mx-auto max-w-5xl px-6 pb-16 pt-16 sm:pb-20 sm:pt-24">
          <h1
            className="max-w-4xl text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1.06] tracking-tight"
            style={{ fontFamily: "var(--font-meridian)" }}
          >
            Business problems can become opportunities.
            <br />
            <em className="font-normal text-[#8a6410]">
              That&rsquo;s been our job since 1998.
            </em>
          </h1>
          <div className="mt-10 grid gap-8 border-t border-[#101426]/15 pt-8 sm:grid-cols-[1fr_1fr]">
            <p className="max-w-md text-lg leading-relaxed text-[#3a4055]">
              BCaD Consulting Management PLC helps entrepreneurs start well,
              enterprises compete, and development programs reach the people
              they&rsquo;re meant for.
            </p>
            <div className="flex flex-col items-start gap-3 sm:items-end">
              <Link
                href="/services"
                className="bg-[#101426] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#22293f]"
              >
                Explore our services
              </Link>
              <Link
                href="/training"
                className="text-sm text-[#3a4055] underline decoration-[#b8860b] decoration-2 underline-offset-4 hover:text-[#101426]"
              >
                Entrepreneurship training →
              </Link>
            </div>
          </div>
        </section>

        {/* Full-bleed photograph */}
        <figure className="relative h-[46vh] min-h-[320px] w-full sm:h-[56vh]">
          <Image
            src="https://images.unsplash.com/photo-1642505367898-cab7a3542cb3?auto=format&fit=crop&w=2400&q=80"
            alt="Addis Ababa at street level — the city where BCaD has worked since 1998"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <figcaption className="absolute bottom-0 right-0 bg-white px-4 py-2 text-xs text-[#3a4055]">
            Addis Ababa, where we&rsquo;ve worked since 1998
          </figcaption>
        </figure>

        {/* Practices — editorial two-column, no cards */}
        <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
          <div className="grid gap-10 sm:grid-cols-[16rem_1fr] sm:gap-16">
            <h2
              className="text-3xl font-semibold leading-snug"
              style={{ fontFamily: "var(--font-meridian)" }}
            >
              What we do
            </h2>
            <div>
              {practices.map((p, i) => (
                <article
                  key={p.name}
                  className={`grid gap-2 py-6 sm:grid-cols-[14rem_1fr] sm:gap-8 ${
                    i > 0 ? "border-t border-[#101426]/10" : "pt-0"
                  }`}
                >
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="leading-relaxed text-[#3a4055]">{p.body}</p>
                </article>
              ))}
              <p className="mt-6 border-t border-[#b8860b] pt-4 text-sm">
                <Link
                  href="/services"
                  className="font-medium underline decoration-[#b8860b] decoration-2 underline-offset-4"
                >
                  The full service list →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Track record — broadsheet list */}
        <section className="border-y border-[#101426]/15 bg-[#f7f8fa]">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
            <div className="grid gap-10 sm:grid-cols-[16rem_1fr] sm:gap-16">
              <div>
                <h2
                  className="text-3xl font-semibold leading-snug"
                  style={{ fontFamily: "var(--font-meridian)" }}
                >
                  Trusted with the hard programs
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[#3a4055]">
                  Development work is judged by what actually reaches people.
                </p>
              </div>
              <div>
                {engagements.map((t, i) => (
                  <div
                    key={t.partner}
                    className={`py-5 ${
                      i > 0 ? "border-t border-[#101426]/10" : "pt-0"
                    }`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-semibold">{t.partner}</h3>
                      <p className="text-sm text-[#8a6410]">{t.period}</p>
                    </div>
                    <p className="mt-1 max-w-xl text-sm leading-relaxed text-[#3a4055]">
                      {t.role}
                    </p>
                  </div>
                ))}
                <p className="mt-6 text-sm leading-loose text-[#3a4055]">
                  Also: USAID · World Bank · UN Women · SNV · CARE Ethiopia —
                  and thousands of enterprising Ethiopians through their
                  programs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Training + contact */}
        <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
          <div className="grid gap-12 sm:grid-cols-2 sm:gap-16">
            <div>
              <p className="text-sm font-medium text-[#8a6410]">
                Now enrolling
              </p>
              <h2
                className="mt-2 text-3xl font-semibold leading-snug"
                style={{ fontFamily: "var(--font-meridian)" }}
              >
                Building a Purpose-Driven Business
              </h2>
              <p className="mt-4 leading-relaxed text-[#3a4055]">
                Our four-week intensive for aspiring entrepreneurs. Find the
                idea worth your life and leave with a business plan you can act
                on.
              </p>
              <Link
                href="/register"
                className="mt-6 inline-block bg-[#101426] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#22293f]"
              >
                Reserve your seat
              </Link>
            </div>
            <div className="border-t border-[#101426]/15 pt-8 sm:border-l sm:border-t-0 sm:pl-16 sm:pt-0">
              <h2
                className="text-3xl font-semibold leading-snug"
                style={{ fontFamily: "var(--font-meridian)" }}
              >
                Have a project in mind?
              </h2>
              <p className="mt-4 leading-relaxed text-[#3a4055]">
                Tell us what you&rsquo;re working on. We&rsquo;ll tell you
                honestly whether we can help.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-block text-sm font-medium underline decoration-[#b8860b] decoration-2 underline-offset-4"
              >
                Get in touch →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#101426]/15">
        <div className="mx-auto flex max-w-5xl flex-col justify-between gap-3 px-6 py-8 text-sm text-[#3a4055] sm:flex-row">
          <p>© {new Date().getFullYear()} BCaD Consulting Management PLC</p>
          <p>
            Lebu Commercial Center, Addis Ababa ·{" "}
            <a href="tel:+251114712993" className="hover:text-[#101426]">
              +251 11 471 2993
            </a>{" "}
            ·{" "}
            <a
              href="mailto:bcadconsulting@gmail.com"
              className="hover:text-[#101426]"
            >
              bcadconsulting@gmail.com
            </a>
          </p>
        </div>
      </footer>

      <OptionsPill current="Meridian" />
    </div>
  );
}
