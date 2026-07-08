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
      <section
        className="text-white"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 20% 0%, var(--ks-navy-glow) 0%, var(--ks-navy) 55%)",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-sm font-semibold text-[color:var(--ks-gold)]">
            Now enrolling — starts July 6
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-tight tracking-[-0.02em]">
            Building a Purpose-Driven Business
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            A four-week intensive training for aspiring entrepreneurs. Find the
            idea worth your life, build the strategy to grow it, and walk away
            with a business plan you can act on.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/register"
              className="ks-btn px-7 py-3.5 font-display text-sm font-semibold text-[color:var(--ks-navy)]"
              style={{ backgroundColor: "var(--ks-gold)" }}
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
            <h2 className="font-display text-3xl font-bold text-[color:var(--ks-navy)]">
              Why train with BCaD?
            </h2>
            <p className="mt-4 leading-[1.75] text-[color:var(--ks-ink)]">
              Entrepreneurship training is not a side business for us —
              it&rsquo;s been our core work since 1998. We run programs on the
              CEFE methodology, developed by GIZ and promoted worldwide by CEFE
              International, of which we are the partner for Ethiopia and
              Africa.
            </p>
            <p className="mt-4 leading-[1.75] text-[color:var(--ks-ink)]">
              Through development programs with partners like USADF, UN Women,
              ITC, SNV, and GIZ, thousands of enterprising Ethiopians — from
              first-time founders to expanding companies — have been through
              our training and counselling.
            </p>
            <p className="mt-4 leading-[1.75] text-[color:var(--ks-ink)]">
              This course distills that experience into four weeks of
              hands-on work: expert-led sessions, personal coaching, peer
              networking, and exercises you complete on your own real idea.
            </p>
          </div>

          <div>
            <h2 className="font-display text-3xl font-bold text-[color:var(--ks-navy)]">
              The curriculum
            </h2>
            <ol className="mt-8 space-y-0">
              {weeks.map((w, i) => (
                <li
                  key={w.label}
                  className={`py-6 ${
                    i > 0 ? "border-t border-[color:var(--ks-line)]" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-display text-sm font-bold text-[color:var(--ks-gold-deep)]">
                      {w.label}
                    </span>
                    <h3 className="text-lg font-semibold text-[color:var(--ks-navy)]">
                      {w.title}
                    </h3>
                  </div>
                  <p className="mt-2 leading-relaxed text-[color:var(--ks-ink)]">
                    {w.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--ks-soft)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <h2 className="font-display text-3xl font-bold text-[color:var(--ks-navy)]">
                Pick the session that fits your day
              </h2>
              <p className="mt-4 leading-relaxed text-[color:var(--ks-ink)]">
                We keep cohorts small so coaching stays personal. Morning and
                afternoon sessions run daily; an evening session is added when
                enough applicants ask for it.
              </p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-3">
              {sessions.map((s) => (
                <li
                  key={s.title}
                  className="border border-[color:var(--ks-line)] bg-white p-6"
                >
                  <h3 className="font-semibold text-[color:var(--ks-navy)]">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-[color:var(--ks-ink)]">
                    {s.detail}
                  </p>
                  {"note" in s && s.note ? (
                    <p className="mt-3 text-xs leading-relaxed text-[color:var(--ks-gold-deep)]">
                      {s.note}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "var(--ks-teal)", color: "var(--ks-navy)" }}>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                Ready to work on the idea worth your life?
              </h2>
              <p className="mt-2 max-w-xl">
                Registration takes five minutes. Payment is by QR through any
                Ethiopian banking app.
              </p>
            </div>
            <Link
              href="/register"
              className="ks-btn flex-shrink-0 px-7 py-3.5 font-display text-sm font-semibold text-white"
              style={{ backgroundColor: "var(--ks-navy)" }}
            >
              Reserve your seat
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
