import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Training",
  description:
    "BCaD Consulting's entrepreneurship training: a 4-week intensive program for aspiring entrepreneurs, built on the CEFE methodology and 25+ years of practice.",
};

const weeks = [
  {
    label: "Week 1",
    title: "Your purpose-driven idea",
    body: "A structured self-assessment to identify your life's purpose, a mind-storm of twenty business ideas congruent with it, and proven screening methods to select your minimum viable product.",
  },
  {
    label: "Week 2",
    title: "Strategy & goal setting",
    body: "Define your business, design a competitive strategy, set SMART goals, and run SWOT and PESTLE analyses to position yourself before you spend a single birr.",
  },
  {
    label: "Weeks 3–4",
    title: "Business planning & management",
    body: "Build your Business Model Canvas, write a complete business plan, and learn the management techniques that keep a competitive advantage from eroding.",
  },
];

const sessions = [
  { title: "Morning", detail: "8:30 – 12:00" },
  { title: "Afternoon", detail: "1:30 – 5:00 pm" },
  {
    title: "Evening",
    detail: "6:00 – 8:00 pm",
    note: "Planned only if enough applicants choose this slot.",
  },
];

export default function TrainingPage() {
  return (
    <main>
      <section className="bg-[color:var(--bcad-navy-950)] text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-sm font-medium text-[color:var(--bcad-gold-400)]">
            Now enrolling — starts July 6
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Building a Purpose-Driven Business
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            A four-week intensive training for aspiring entrepreneurs. Find the
            idea worth your life, build the strategy to grow it, and walk away
            with a business plan you can act on.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/register"
              className="rounded-full bg-[color:var(--bcad-gold-500)] px-7 py-3.5 text-sm font-semibold text-[color:var(--bcad-navy-950)] transition hover:bg-[color:var(--bcad-gold-400)]"
            >
              Register for the training
            </Link>
            <p className="text-sm text-white/70">
              20,000 ETB · certificate of completion
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <h2 className="font-display text-3xl font-semibold text-[color:var(--foreground)]">
              Why train with BCaD?
            </h2>
            <p className="mt-4 leading-relaxed text-[color:var(--bcad-ink-600)]">
              Entrepreneurship training is not a side business for us —
              it&rsquo;s been our core work since 1998. We run programs on the
              CEFE methodology, developed by GIZ and promoted worldwide by CEFE
              International, of which we are the partner for Ethiopia and
              Africa.
            </p>
            <p className="mt-4 leading-relaxed text-[color:var(--bcad-ink-600)]">
              Through development programs with partners like USADF, UN Women,
              ITC, SNV, and GIZ, thousands of enterprising Ethiopians — from
              first-time founders to expanding companies — have been through
              our training and counselling.
            </p>
            <p className="mt-4 leading-relaxed text-[color:var(--bcad-ink-600)]">
              This course distills that experience into four weeks of
              hands-on work: expert-led sessions, personal coaching, peer
              networking, and exercises you complete on your own real idea.
            </p>
          </div>

          <div>
            <h2 className="font-display text-3xl font-semibold text-[color:var(--foreground)]">
              The curriculum
            </h2>
            <ol className="mt-8 space-y-0">
              {weeks.map((w, i) => (
                <li
                  key={w.label}
                  className={`py-6 ${
                    i > 0 ? "border-t border-[color:var(--bcad-line-200)]" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-display text-sm font-semibold uppercase tracking-widest text-[color:var(--bcad-gold-700)]">
                      {w.label}
                    </span>
                    <h3 className="text-lg font-semibold text-[color:var(--foreground)]">
                      {w.title}
                    </h3>
                  </div>
                  <p className="mt-2 leading-relaxed text-[color:var(--bcad-ink-600)]">
                    {w.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--bcad-mist-50)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <h2 className="font-display text-3xl font-semibold text-[color:var(--foreground)]">
                Pick the session that fits your day
              </h2>
              <p className="mt-4 leading-relaxed text-[color:var(--bcad-ink-600)]">
                We keep cohorts small so coaching stays personal. Morning and
                afternoon sessions run daily; an evening session is added when
                enough applicants ask for it.
              </p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-3">
              {sessions.map((s) => (
                <li
                  key={s.title}
                  className="rounded-2xl border border-[color:var(--bcad-line-200)] bg-white p-6"
                >
                  <h3 className="font-semibold text-[color:var(--foreground)]">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-[color:var(--bcad-ink-600)]">
                    {s.detail}
                  </p>
                  {"note" in s && s.note ? (
                    <p className="mt-3 text-xs leading-relaxed text-[color:var(--bcad-gold-700)]">
                      {s.note}
                    </p>
                  ) : null}
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
                Ready to work on the idea worth your life?
              </h2>
              <p className="mt-2 max-w-xl text-white/75">
                Registration takes five minutes. Payment is by QR through any
                Ethiopian banking app.
              </p>
            </div>
            <Link
              href="/register"
              className="flex-shrink-0 rounded-full bg-[color:var(--bcad-gold-500)] px-7 py-3.5 text-sm font-semibold text-[color:var(--bcad-navy-950)] transition hover:bg-[color:var(--bcad-gold-400)]"
            >
              Reserve your seat
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
