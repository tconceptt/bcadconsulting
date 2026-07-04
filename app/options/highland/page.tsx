import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bricolage_Grotesque } from "next/font/google";
import { OptionsPill } from "../OptionsPill";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-highland",
});

export const metadata: Metadata = {
  title: "Option 4 · Highland",
};

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/training", label: "Training" },
  { href: "/contact", label: "Contact" },
];

const practices = [
  {
    name: "Consulting",
    body: "Strategy, diagnostics, and value chains for enterprises from first stall to first export.",
  },
  {
    name: "HR & BPO",
    body: "Recruitment, payroll, and compliance — so organizations can focus on their real work.",
  },
  {
    name: "Solar energy",
    body: "Ketir Solar brings productive power to rural businesses the grid hasn't reached.",
  },
  {
    name: "Nutrition",
    body: "Bekidmia — 'first things first' — keeps working people well enough to work.",
  },
];

export default function HighlandPage() {
  return (
    <div
      className={`${bricolage.variable} min-h-screen bg-white text-[#231a05]`}
      style={{ fontFamily: "var(--font-highland)" }}
    >
      {/* Gold-drenched masthead + hero as one surface */}
      <div className="bg-[#e3aa1a] text-[#231a05]">
        <header>
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
            <Link
              href="/options/highland"
              className="text-xl font-extrabold tracking-tight"
            >
              BCaD
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="hidden transition hover:opacity-60 sm:inline"
                >
                  {n.label}
                </Link>
              ))}
              <Link
                href="/register"
                className="rounded-full bg-[#231a05] px-5 py-2.5 text-white transition hover:bg-[#3d2f10]"
              >
                Register
              </Link>
            </nav>
          </div>
        </header>

        <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-10 sm:pb-24 sm:pt-16 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <h1 className="text-[clamp(2.6rem,6.5vw,5rem)] font-extrabold leading-[1.02] tracking-tight">
              Good businesses grow&nbsp;here.
            </h1>
            <p className="mt-6 max-w-lg text-lg font-medium leading-relaxed">
              We&rsquo;ve spent 25+ years helping Ethiopian entrepreneurs turn
              problems into working, income-earning enterprises — with
              consulting, training, HR services, and solar power.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/training"
                className="rounded-full bg-[#231a05] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#3d2f10]"
              >
                Join the training
              </Link>
              <Link
                href="/services"
                className="rounded-full border-2 border-[#231a05] px-7 py-3.5 text-sm font-semibold transition hover:bg-[#231a05] hover:text-white"
              >
                See our services
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1572702205127-5f64b9deaae9?auto=format&fit=crop&w=900&q=80"
                alt="A vegetable seller at an Ethiopian market — the kind of enterprise BCaD supports"
                fill
                sizes="(max-width: 1024px) 45vw, 300px"
                className="object-cover"
              />
            </div>
            <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1630861412757-d9743d318312?auto=format&fit=crop&w=900&q=80"
                alt="Hands preparing an Ethiopian coffee ceremony"
                fill
                sizes="(max-width: 1024px) 45vw, 300px"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Practices — alternating rhythm, no card grid */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Four ways we help, one goal: enterprises that work.
        </h2>
        <div className="mt-12 grid gap-x-14 gap-y-10 sm:grid-cols-2">
          {practices.map((p) => (
            <div key={p.name} className="flex gap-5">
              <span
                aria-hidden
                className="mt-1.5 block h-4 w-4 flex-shrink-0 rounded-full bg-[#e3aa1a]"
              />
              <div>
                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className="mt-2 leading-relaxed text-[#5c4d22]">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/services"
          className="mt-12 inline-block rounded-full border-2 border-[#231a05] px-7 py-3.5 text-sm font-semibold transition hover:bg-[#231a05] hover:text-white"
        >
          Everything we do →
        </Link>
      </section>

      {/* Photo + story band */}
      <section className="bg-[#231a05] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="https://images.unsplash.com/photo-1572851569977-e18b9ea6edbe?auto=format&fit=crop&w=1400&q=80"
              alt="A busy Ethiopian market street with produce stands"
              fill
              sizes="(max-width: 1024px) 90vw, 560px"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              We work where the economy actually happens.
            </h2>
            <p className="mt-5 leading-relaxed text-white/80">
              Markets, workshops, farms, and shops — across every regional
              state of Ethiopia and six other African countries. With partners
              like USADF, UN Women, GIZ, ITC, SNV, and the World Bank,
              thousands of enterprising people have been through our training
              and advisory work.
            </p>
            <p className="mt-4 leading-relaxed text-white/80">
              Some of our proudest work is the hardest: helping displaced
              people and failed businesses start again.
            </p>
            <Link
              href="/about"
              className="mt-7 inline-block font-semibold text-[#e3aa1a] underline-offset-4 hover:underline"
            >
              Our story since 1998 →
            </Link>
          </div>
        </div>
      </section>

      {/* Training CTA — gold again */}
      <section className="bg-[#e3aa1a]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 py-16 sm:py-20 lg:flex-row lg:items-center">
          <div>
            <h2 className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Got a business idea that won&rsquo;t leave you alone?
            </h2>
            <p className="mt-4 max-w-lg font-medium">
              Our 4-week intensive, Building a Purpose-Driven Business, turns
              it into a plan you can act on. Small cohorts, real coaching.
            </p>
          </div>
          <Link
            href="/register"
            className="flex-shrink-0 rounded-full bg-[#231a05] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#3d2f10]"
          >
            Reserve your seat →
          </Link>
        </div>
      </section>

      <footer className="bg-white">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 px-6 py-8 text-sm text-[#5c4d22] sm:flex-row">
          <p>© {new Date().getFullYear()} BCaD Consulting Management PLC</p>
          <p>
            Addis Ababa ·{" "}
            <a href="tel:+251114712993" className="font-medium hover:underline">
              +251 11 471 2993
            </a>{" "}
            ·{" "}
            <Link href="/contact" className="font-medium hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </footer>

      <OptionsPill current="Highland" />
    </div>
  );
}
