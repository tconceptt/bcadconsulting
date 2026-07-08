import type { Metadata } from "next";
import Link from "next/link";
import { RegistrationForm } from "./RegistrationForm";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Reserve your seat for BCaD Consulting's 4-week intensive training for aspiring entrepreneurs. Discover your purpose, build strategy, and launch with confidence.",
};

const facts = [
  { label: "Starts", value: "July 6" },
  { label: "Duration", value: "4 weeks, intensive" },
  { label: "Fee", value: "20,000 ETB" },
  { label: "Sessions", value: "Morning, afternoon, or evening" },
  { label: "Includes", value: "Coaching, peer group, certificate" },
];

const weeks = [
  { label: "Week 1", title: "Your purpose-driven idea" },
  { label: "Week 2", title: "Strategy & goal setting" },
  { label: "Weeks 3–4", title: "Business planning & management" },
];

export default function RegisterPage() {
  return (
    <main>
      <section
        className="text-white"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 20% 0%, var(--ks-navy-glow) 0%, var(--ks-navy) 55%)",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="text-sm font-semibold text-[color:var(--ks-gold)]">
            Now enrolling — Building a Purpose-Driven Business
          </p>
          <h1 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
            Reserve your seat.
          </h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-white/80">
            Registration takes about five minutes. Payment is by QR through any
            Ethiopian banking app, and our team confirms your seat within 24
            hours.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <div>
          <RegistrationForm />
        </div>

        <aside className="space-y-10 lg:border-l lg:border-[color:var(--ks-line)] lg:pl-10">
          <div>
            <h2 className="font-display text-xl font-bold text-[color:var(--ks-navy)]">
              The program at a glance
            </h2>
            <dl className="mt-5">
              {facts.map((f, i) => (
                <div
                  key={f.label}
                  className={`flex items-baseline justify-between gap-4 py-3 ${
                    i > 0 ? "border-t border-[color:var(--ks-line)]" : ""
                  }`}
                >
                  <dt className="text-sm text-[color:var(--ks-ink)]">
                    {f.label}
                  </dt>
                  <dd className="text-right text-sm font-medium text-[color:var(--ks-navy)]">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-[color:var(--ks-navy)]">
              What the four weeks cover
            </h2>
            <ol className="mt-5 space-y-3">
              {weeks.map((w) => (
                <li key={w.label} className="flex gap-4 text-sm">
                  <span className="w-20 flex-shrink-0 font-bold text-[color:var(--ks-gold-deep)]">
                    {w.label}
                  </span>
                  <span className="text-[color:var(--ks-navy)]">
                    {w.title}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--ks-ink)]">
              The full curriculum, schedules, and what to expect are on the{" "}
              <Link
                href="/training"
                className="font-medium text-[color:var(--ks-blue)] underline-offset-4 hover:underline"
              >
                training page
              </Link>
              .
            </p>
          </div>

          <div className="bg-[color:var(--ks-soft)] p-6">
            <h2 className="font-display text-xl font-bold text-[color:var(--ks-navy)]">
              Stuck on the form?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--ks-ink)]">
              Call or write and we&rsquo;ll register you over the phone.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="mailto:training@bcadconsulting.com"
                  className="font-medium text-[color:var(--ks-blue)] hover:underline"
                >
                  training@bcadconsulting.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+251937933333"
                  className="font-medium text-[color:var(--ks-blue)] hover:underline"
                >
                  +251 093 793 3333
                </a>
              </li>
              <li>
                <a
                  href="tel:+251937333355"
                  className="font-medium text-[color:var(--ks-blue)] hover:underline"
                >
                  +251 093 733 3355
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}
