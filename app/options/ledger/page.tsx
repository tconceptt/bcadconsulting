import type { Metadata } from "next";
import Link from "next/link";
import { Archivo } from "next/font/google";
import { OptionsPill } from "../OptionsPill";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ledger",
});

export const metadata: Metadata = {
  title: "Option 3 · Ledger",
};

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/training", label: "Training" },
  { href: "/contact", label: "Contact" },
];

const practiceRows = [
  {
    code: "A",
    name: "Management consulting",
    scope: "Strategy · diagnostics · value chains · entrepreneurship",
    since: "1998",
  },
  {
    code: "B",
    name: "BPO & HR services",
    scope: "Recruitment · payroll · compliance · back office",
    since: "—",
  },
  {
    code: "C",
    name: "Renewable energy (Ketir Solar)",
    scope: "Import · last-mile distribution · productive equipment",
    since: "2018",
  },
  {
    code: "D",
    name: "Dietetic counselling (Bekidmia)",
    scope: "Individual & workplace nutrition programs",
    since: "2022",
  },
];

const engagementRows = [
  {
    years: "2006–2013",
    client: "CDE (ACP/EU)",
    work: "Technical Intervention Office, Ethiopia — EU private sector development",
  },
  {
    years: "2014–2018",
    client: "USADF",
    work: "Power Africa technical partner — off-grid energy support & monitoring",
  },
  {
    years: "2007–",
    client: "Intl. Trade Centre",
    work: "BMS diagnostics, MLS-SCM supply chain learning, ACCESS! export readiness",
  },
  {
    years: "ongoing",
    client: "GIZ / CEFE Intl.",
    work: "CEFE entrepreneurship methodology partner for Ethiopia & Africa",
  },
  {
    years: "various",
    client: "UN Women, SNV, World Bank, CARE",
    work: "Women's economic empowerment, value chain platforms, WASH studies",
  },
];

const coverage = [
  ["Ethiopia", "All regional states"],
  ["Nigeria", "Assignments"],
  ["South Sudan", "Assignments"],
  ["DR Congo", "Assignments"],
  ["Tanzania", "Assignments"],
  ["Kenya", "Assignments"],
  ["Egypt", "Assignments"],
];

export default function LedgerPage() {
  return (
    <div
      className={`${archivo.variable} min-h-screen bg-[#fafbfd] text-[#14161f]`}
      style={{ fontFamily: "var(--font-ledger)" }}
    >
      <header className="border-b-2 border-[#14161f]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/options/ledger"
            className="flex items-center gap-2.5 font-semibold"
          >
            <span aria-hidden className="block h-3.5 w-3.5 bg-[#d92f2f]" />
            BCaD Consulting Management PLC
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="hidden text-[#14161f]/60 transition hover:text-[#14161f] sm:inline"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/register"
              className="bg-[#14161f] px-4 py-2 font-medium text-white transition hover:bg-[#d92f2f]"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6">
        {/* Hero — factual, flush left */}
        <section className="grid gap-10 border-b border-[#14161f]/20 py-14 sm:py-20 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h1 className="max-w-3xl text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
              Consulting for enterprises that have to work in the real economy.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#4a4e5e]">
              Management consulting, training, HR outsourcing, and solar
              energy. Established Addis Ababa, 1998. Incorporated as PLC, 2010.
            </p>
          </div>
          <dl className="grid content-start gap-x-6 gap-y-4 self-end sm:grid-cols-2">
            {[
              ["Established", "1998"],
              ["Countries", "7"],
              ["Service lines", "12"],
              ["Trained", "1,000s"],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-[#14161f]/20 pt-3">
                <dt className="text-xs text-[#4a4e5e]">{k}</dt>
                <dd className="mt-0.5 text-2xl font-semibold tabular-nums tracking-tight">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Practices table */}
        <section className="border-b border-[#14161f]/20 py-14 sm:py-20">
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              Practices
            </h2>
            <Link
              href="/services"
              className="text-sm font-medium text-[#d92f2f] hover:underline"
            >
              Full detail →
            </Link>
          </div>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-[#14161f] text-xs text-[#4a4e5e]">
                  <th className="py-2 pr-4 font-medium">Ref.</th>
                  <th className="py-2 pr-4 font-medium">Practice</th>
                  <th className="py-2 pr-4 font-medium">Scope</th>
                  <th className="py-2 text-right font-medium">Since</th>
                </tr>
              </thead>
              <tbody>
                {practiceRows.map((r) => (
                  <tr
                    key={r.code}
                    className="border-b border-[#14161f]/15 align-baseline"
                  >
                    <td className="py-4 pr-4 font-semibold text-[#d92f2f]">
                      {r.code}
                    </td>
                    <td className="py-4 pr-4 font-semibold">{r.name}</td>
                    <td className="py-4 pr-4 text-sm text-[#4a4e5e]">
                      {r.scope}
                    </td>
                    <td className="py-4 text-right tabular-nums">{r.since}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Engagements table */}
        <section className="border-b border-[#14161f]/20 py-14 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight">
            Selected engagements
          </h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-[#14161f] text-xs text-[#4a4e5e]">
                  <th className="py-2 pr-4 font-medium">Years</th>
                  <th className="py-2 pr-4 font-medium">Client / partner</th>
                  <th className="py-2 font-medium">Engagement</th>
                </tr>
              </thead>
              <tbody>
                {engagementRows.map((r) => (
                  <tr
                    key={r.client}
                    className="border-b border-[#14161f]/15 align-baseline"
                  >
                    <td className="py-4 pr-4 tabular-nums text-[#4a4e5e]">
                      {r.years}
                    </td>
                    <td className="py-4 pr-4 font-semibold">{r.client}</td>
                    <td className="py-4 text-sm leading-relaxed text-[#4a4e5e]">
                      {r.work}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Coverage + training, two ledgers side by side */}
        <section className="grid gap-14 py-14 sm:py-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Regional coverage
            </h2>
            <ul className="mt-8">
              {coverage.map(([country, note], i) => (
                <li
                  key={country}
                  className={`flex items-baseline justify-between py-2.5 text-sm ${
                    i > 0 ? "border-t border-[#14161f]/15" : ""
                  }`}
                >
                  <span className="font-medium">{country}</span>
                  <span className="text-[#4a4e5e]">{note}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-[#4a4e5e]">
              Including post-conflict rehabilitative work: entrepreneurship
              training and credit facilities for displaced people restarting
              businesses.
            </p>
          </div>

          <div className="bg-[#14161f] p-8 text-white sm:p-10">
            <p className="text-sm font-medium text-[#d92f2f]">
              Open for registration
            </p>
            <h2 className="mt-3 text-2xl font-semibold leading-snug tracking-tight">
              Building a Purpose-Driven Business — 4-week intensive
            </h2>
            <dl className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between border-t border-white/20 py-2">
                <dt className="text-white/60">Fee</dt>
                <dd className="tabular-nums">20,000 ETB</dd>
              </div>
              <div className="flex justify-between border-t border-white/20 py-2">
                <dt className="text-white/60">Formats</dt>
                <dd>In person / live online</dd>
              </div>
              <div className="flex justify-between border-t border-white/20 py-2">
                <dt className="text-white/60">Outcome</dt>
                <dd>An actionable business plan</dd>
              </div>
            </dl>
            <Link
              href="/register"
              className="mt-8 inline-block bg-[#d92f2f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#b52222]"
            >
              Register now
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-[#14161f]">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-6 py-6 text-sm text-[#4a4e5e] sm:flex-row">
          <p>© {new Date().getFullYear()} BCaD Consulting Management PLC</p>
          <p>
            Lebu Commercial Center, Addis Ababa · +251 11 471 2993 ·{" "}
            <Link href="/contact" className="text-[#d92f2f] hover:underline">
              Contact
            </Link>
          </p>
        </div>
      </footer>

      <OptionsPill current="Ledger" />
    </div>
  );
}
