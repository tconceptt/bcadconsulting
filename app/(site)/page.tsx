import Link from "next/link";

const practices = [
  {
    href: "/services#consulting",
    name: "Management consulting",
    body: "Business diagnosis, strategy, value chains, and entrepreneurship development — using internationally anchored tools like CEFE and ValueLinks.",
  },
  {
    href: "/services#bpo",
    name: "BPO & HR services",
    body: "Recruitment, payroll, compliance, and back-office capacity for organizations that need reliable operations in Ethiopia.",
  },
  {
    href: "/services#solar",
    name: "Renewable energy",
    body: "Ketir Solar imports and distributes solar equipment to rural areas where electricity is what stands between a family and a working business.",
  },
  {
    href: "/services#dietetics",
    name: "Dietetic counselling",
    body: "Bekidmia — 'first things first' in Amharic — helps individuals and workplaces eat well enough to work well.",
  },
];

const trackRecord = [
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
    role: "Promoting enterprise competitiveness tools — business diagnostics, supply chain learning, and export readiness for African women entrepreneurs.",
  },
  {
    period: "Ongoing",
    partner: "GIZ · CEFE International",
    role: "Partner promoting the CEFE entrepreneurship methodology in Ethiopia and Africa; our CEO co-founded ValueLinks International.",
  },
];

const stats = [
  { value: "25+", label: "years in practice, established 1998" },
  { value: "7", label: "African countries worked in" },
  { value: "12", label: "business development service lines" },
  { value: "1,000s", label: "of entrepreneurs trained and counselled" },
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

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[color:var(--bcad-navy-950)] text-white">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
          <p className="text-sm font-medium text-[color:var(--bcad-gold-400)]">
            BCaD Consulting Management PLC · Addis Ababa
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
            Business problems can become opportunities. That&rsquo;s been our
            job since 1998.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/75">
            We help entrepreneurs start well, enterprises compete, and
            development programs reach the people they&rsquo;re meant for —
            through consulting, training, HR services, and solar energy for
            the places that need it most.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/services"
              className="rounded-full bg-[color:var(--bcad-gold-500)] px-7 py-3.5 text-sm font-semibold text-[color:var(--bcad-navy-950)] transition hover:bg-[color:var(--bcad-gold-400)]"
            >
              Explore our services
            </Link>
            <Link
              href="/training"
              className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Entrepreneurship training
            </Link>
          </div>
        </div>
      </section>

      {/* Credibility strip */}
      <section
        aria-label="BCaD at a glance"
        className="border-b border-[color:var(--bcad-line-200)]"
      >
        <dl className="mx-auto grid max-w-6xl gap-x-8 gap-y-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dd className="font-display text-4xl font-semibold text-[color:var(--bcad-navy-900)] sm:text-5xl">
                {s.value}
              </dd>
              <dt className="mt-2 max-w-[16rem] text-sm leading-snug text-[color:var(--bcad-ink-600)]">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Who we are */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <h2 className="font-display text-3xl font-semibold leading-snug text-[color:var(--foreground)] sm:text-4xl">
            A small firm with a long reach.
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-[color:var(--bcad-ink-600)]">
            <p>
              BCaD is a multidisciplinary consulting firm: ten full-time
              consultants and staff, backed by a trained network of more than
              twenty professionals we&rsquo;ve worked with for years.
              We&rsquo;ve delivered assignments across every regional state of
              Ethiopia and in six other African countries.
            </p>
            <p>
              Our clients are mostly international and local development
              organizations — and through their programs, thousands of
              enterprising Ethiopians, from market-stall owners to exporters,
              have been through our training and advisory work.
            </p>
            <p>
              <Link
                href="/about"
                className="font-semibold text-[color:var(--bcad-navy-700)] underline-offset-4 hover:underline"
              >
                Read our story →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Practices */}
      <section className="bg-[color:var(--bcad-mist-50)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <h2 className="max-w-xl font-display text-3xl font-semibold leading-snug text-[color:var(--foreground)] sm:text-4xl">
            What we do
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--bcad-line-200)] bg-[color:var(--bcad-line-200)] sm:grid-cols-2">
            {practices.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group flex flex-col bg-white p-8 transition hover:bg-[color:var(--bcad-mist-100)]"
              >
                <h3 className="font-display text-xl font-semibold text-[color:var(--foreground)]">
                  {p.name}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-[color:var(--bcad-ink-600)]">
                  {p.body}
                </p>
                <p className="mt-5 text-sm font-semibold text-[color:var(--bcad-gold-700)]">
                  Learn more{" "}
                  <span
                    aria-hidden
                    className="inline-block transition group-hover:translate-x-1"
                  >
                    →
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Track record */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold leading-snug text-[color:var(--foreground)] sm:text-4xl">
            Trusted with the hard programs
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[color:var(--bcad-ink-600)]">
            Development work is judged by what actually reaches people. These
            are some of the partnerships we&rsquo;ve carried over the years.
          </p>
        </div>
        <ul className="mt-12">
          {trackRecord.map((t, i) => (
            <li
              key={t.partner}
              className={`grid gap-2 py-6 sm:grid-cols-[9rem_14rem_1fr] sm:gap-8 ${
                i > 0 ? "border-t border-[color:var(--bcad-line-200)]" : ""
              }`}
            >
              <p className="text-sm font-medium text-[color:var(--bcad-gold-700)]">
                {t.period}
              </p>
              <h3 className="font-semibold text-[color:var(--foreground)]">
                {t.partner}
              </h3>
              <p className="leading-relaxed text-[color:var(--bcad-ink-600)]">
                {t.role}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-10 border-t border-[color:var(--bcad-line-200)] pt-8 text-sm leading-loose text-[color:var(--bcad-ink-600)]">
          <span className="font-semibold text-[color:var(--foreground)]">
            Clients and partners include:
          </span>{" "}
          {clients.join(" · ")}
        </p>
      </section>

      {/* Training CTA */}
      <section className="bg-[color:var(--bcad-navy-950)] text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-20">
            <div>
              <p className="text-sm font-medium text-[color:var(--bcad-gold-400)]">
                Now enrolling
              </p>
              <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-snug sm:text-4xl">
                Building a Purpose-Driven Business — our 4-week intensive for
                aspiring entrepreneurs.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
                Find the idea worth your life, test it against reality, and
                leave with a business plan you can act on. Small cohorts,
                personal coaching, in person or online.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <Link
                href="/register"
                className="rounded-full bg-[color:var(--bcad-gold-500)] px-8 py-4 text-sm font-semibold text-[color:var(--bcad-navy-950)] transition hover:bg-[color:var(--bcad-gold-400)]"
              >
                Register for the training
              </Link>
              <Link
                href="/training"
                className="text-sm font-medium text-white/80 underline-offset-4 hover:text-white hover:underline"
              >
                See the full curriculum
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold text-[color:var(--foreground)] sm:text-3xl">
              Have a project in mind?
            </h2>
            <p className="mt-2 max-w-xl text-[color:var(--bcad-ink-600)]">
              Tell us what you&rsquo;re working on. We&rsquo;ll tell you
              honestly whether we can help.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 rounded-full bg-[color:var(--bcad-navy-900)] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[color:var(--bcad-navy-800)]"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}
