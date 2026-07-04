import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Management consulting, business development services, HR outsourcing, solar equipment, and dietetic counselling — BCaD Consulting's four practices, explained plainly.",
};

const practices = [
  {
    id: "consulting",
    short: "Management Consulting",
    name: "Management Consulting & Business Development",
    since: "Since 1998",
    intro:
      "The core of the firm. We help enterprises — from new start-ups to companies ready to diversify — diagnose their business, sharpen their strategy, and build the management systems to carry it out.",
    detail:
      "Our tools are internationally anchored and locally tested. We run entrepreneurship programs with the CEFE methodology developed by GIZ, analyze value chains with the ValueLinks approach, and use ITC's Business Management Systems model for diagnostics and strategy design. Training of trainers, business skills training for youth and women, export management development, and women's economic empowerment programs round out the practice.",
    offerings: [
      "Business diagnosis, strategy design & planning",
      "Entrepreneurship development (CEFE methodology)",
      "Value chain analysis & development (ValueLinks)",
      "Supply chain management (ITC's Modular Learning System)",
      "Export management development",
      "Training of trainers & business skills training",
      "Women's economic empowerment programs",
    ],
  },
  {
    id: "bpo",
    short: "BPO & HR Services",
    name: "Business Process Outsourcing & HR Services",
    since: "Established practice",
    intro:
      "We take on the processes that distract organizations from their real work — above all, human resources.",
    detail:
      "From HR outsourcing to compliance and contracts, our BPO practice serves organizations that need reliable back-office capacity in Ethiopia without building it themselves. Development programs and private firms alike use us to recruit, manage, and pay project staff correctly.",
    offerings: [
      "HR outsourcing & staff administration",
      "Recruitment and contract management",
      "Payroll and compliance support",
      "Back-office process management",
    ],
  },
  {
    id: "solar",
    short: "Renewable Energy",
    name: "Renewable Energy — Ketir Solar",
    since: "Since 2018",
    intro:
      "Under the trade name Ketir Solar Equipment Import, we import solar equipment and move it through last-mile distributors to rural and peri-urban areas where electricity is badly needed to run businesses.",
    detail:
      "We're particularly focused on solar-powered productive equipment — tools that let rural SMEs work, not just light their homes. We are collaborating with the Ministry of Water and Energy to access the World Bank's ADELE Fund for exactly this purpose, and we bring operating experience from supporting USADF's Power Africa off-grid energy program from 2014 to 2018.",
    offerings: [
      "Import & distribution of solar equipment",
      "Last-mile distribution partnerships",
      "Solar-powered productive equipment for rural SMEs",
      "After-sales service",
    ],
  },
  {
    id: "dietetics",
    short: "Dietetic Counselling",
    name: "Dietetic & Nutritional Counselling — Bekidmia",
    since: "Since 2022",
    intro:
      "Bekidmia — Amharic for 'first things first' — is our dietary counselling and coaching service, born from watching serious ailments spread through the workforce because of unhealthy eating.",
    detail:
      "We counsel individuals and organizations on nutrition, because a healthy team is a precondition for a healthy business — and because caring for people's well-being is written into our mission, not bolted onto it.",
    offerings: [
      "Individual dietary counselling & coaching",
      "Workplace nutrition programs",
      "Nutritional advisory for organizations",
    ],
  },
];

const sectors = [
  "Youth employment & job creation",
  "Women's economic empowerment",
  "Agriculture & agro-processing",
  "Renewable energy",
  "Export marketing",
  "Textile & garment manufacturing",
  "Leather & leather products",
  "Tourism",
  "Handicrafts",
  "Business services",
];

export default function ServicesPage() {
  return (
    <main>
      <section className="bg-[color:var(--bcad-navy-950)] text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Four practices, one purpose: enterprises that work.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            We started in management consulting and grew where our clients
            needed us — into HR outsourcing, solar energy, and nutrition. Every
            practice serves the same goal: businesses that create income and
            employment, run by people who are well.
          </p>
          <nav aria-label="Practices" className="mt-10 flex flex-wrap gap-2.5">
            {practices.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/85 transition hover:border-[color:var(--bcad-gold-400)] hover:text-white"
              >
                {p.short}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {practices.map((p, i) => (
          <section
            key={p.id}
            id={p.id}
            className={`scroll-mt-24 py-16 sm:py-20 ${
              i > 0 ? "border-t border-[color:var(--bcad-line-200)]" : ""
            }`}
          >
            <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
              <div>
                <p className="text-sm font-medium text-[color:var(--bcad-gold-700)]">
                  {p.since}
                </p>
                <h2 className="mt-2 max-w-xl font-display text-3xl font-semibold leading-snug text-[color:var(--foreground)]">
                  {p.name}
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[color:var(--bcad-ink-700)]">
                  {p.intro}
                </p>
                <p className="mt-4 max-w-2xl leading-relaxed text-[color:var(--bcad-ink-600)]">
                  {p.detail}
                </p>
              </div>
              <div className="lg:pt-12">
                <div className="rounded-2xl bg-[color:var(--bcad-mist-50)] p-7">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[color:var(--bcad-ink-700)]">
                    What this covers
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {p.offerings.map((o) => (
                      <li
                        key={o}
                        className="flex gap-3 text-sm leading-relaxed text-[color:var(--bcad-ink-600)]"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.45rem] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[color:var(--bcad-gold-500)]"
                        />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="bg-[color:var(--bcad-mist-50)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <h2 className="font-display text-3xl font-semibold text-[color:var(--foreground)]">
                Where we know the ground
              </h2>
              <p className="mt-4 leading-relaxed text-[color:var(--bcad-ink-600)]">
                Our expertise cuts across sectors, but these are the areas
                where we&rsquo;ve done the most hands-on work.
              </p>
            </div>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {sectors.map((s) => (
                <li
                  key={s}
                  className="border-b border-[color:var(--bcad-line-200)] pb-3 text-[color:var(--bcad-ink-700)]"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="rounded-2xl bg-[color:var(--bcad-navy-950)] px-8 py-12 text-white sm:px-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                Not sure which practice fits your problem?
              </h2>
              <p className="mt-2 max-w-xl text-white/75">
                Describe it to us in plain words. We&rsquo;ll tell you honestly
                whether — and how — we can help.
              </p>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 rounded-full bg-[color:var(--bcad-gold-500)] px-7 py-3.5 text-sm font-semibold text-[color:var(--bcad-navy-950)] transition hover:bg-[color:var(--bcad-gold-400)]"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
