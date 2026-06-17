import type { Metadata } from "next";
import Link from "next/link";
import { RegistrationForm } from "./RegistrationForm";

export const metadata: Metadata = {
  title: "Register — Building a Purpose-Driven Business | BCAD Consulting",
  description:
    "Reserve your seat for BCAD Consulting's 4-week intensive training for aspiring entrepreneurs. Discover your purpose, build strategy, and launch with confidence.",
};

const weeks = [
  {
    label: "Week 1",
    title: "Your Purpose-Driven Idea",
    body: "Self-assessment to identify your life's purpose, mind-storm 20 business ideas congruent to that purpose, and select your Minimum Viable Product through proven screening methods.",
  },
  {
    label: "Week 2",
    title: "Strategy & Goal Setting",
    body: "Define your business, design a competitive strategy, set SMART goals, and conduct SWOT and PESTLE analyses to position yourself for success.",
  },
  {
    label: "Weeks 3 – 4",
    title: "Business Planning & Management",
    body: "Build your Business Model Canvas, write a comprehensive business plan, and learn management techniques for sustained competitive advantage.",
  },
];

const pillars = [
  { title: "Discover your purpose", icon: "◎" },
  { title: "Build smart strategies", icon: "💡" },
  { title: "Plan, manage & grow", icon: "📈" },
  { title: "Compete & win", icon: "🏆" },
];

const inclusions = [
  "Hands-on exercises",
  "Expert-led sessions",
  "Personal coaching",
  "Peer networking",
  "Certificate of completion",
];

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-[color:var(--bcad-navy-950)] text-white">
      <BackgroundDecor />

      <header className="relative z-10 mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-6 sm:px-6">
        <Link href="/" className="font-display text-lg font-semibold tracking-wide">
          BCAD <span className="text-white/60">Consulting</span>
        </Link>
        <div className="hidden text-sm text-white/70 sm:flex sm:items-center sm:gap-6">
          <a href="mailto:training@bcadconsulting.com" className="hover:text-white">
            training@bcadconsulting.com
          </a>
          <a href="tel:+251937933333" className="hover:text-white">
            +251 093 793 3333
          </a>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6">
        <section className="grid gap-10 pt-8 sm:gap-12 sm:pt-10 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-16">
          <div className="space-y-10">
            <div className="space-y-5">
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-[color:var(--bcad-gold-400)] sm:px-4 sm:text-xs sm:tracking-[0.35em]">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[color:var(--bcad-gold-400)]" />
                <span className="truncate">Limited cohort — open registration</span>
              </span>
              <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-[3.5rem]">
                <span className="block italic text-[color:var(--bcad-gold-400)]">
                  Building a
                </span>
                Purpose-Driven Business
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                A 4-week intensive training for aspiring entrepreneurs. Find the
                idea worth your life, build the strategy to grow it, and walk
                away with a business plan you can act on.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 text-center"
                >
                  <div className="text-2xl text-[color:var(--bcad-gold-400)]">
                    {p.icon}
                  </div>
                  <p className="mt-2 text-xs font-medium leading-snug text-white/80">
                    {p.title}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                What you&rsquo;ll get
              </h2>
              <ol className="space-y-3">
                {weeks.map((w) => (
                  <li
                    key={w.label}
                    className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="font-display text-sm font-semibold uppercase tracking-widest text-[color:var(--bcad-gold-400)]">
                        {w.label}
                      </span>
                      <h3 className="text-base font-semibold text-white sm:text-lg">
                        {w.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      {w.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-wrap gap-2">
              {inclusions.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[color:var(--bcad-gold-400)]/30 bg-[color:var(--bcad-gold-400)]/5 px-3 py-1 text-xs text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-8">
            <div className="rounded-3xl border border-white/15 bg-[color:var(--bcad-navy-900)]/80 p-5 shadow-2xl shadow-black/40 backdrop-blur sm:p-7 lg:p-8">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-white/10 pb-5">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--bcad-gold-400)] sm:text-xs sm:tracking-[0.35em]">
                    Register Now
                  </p>
                  <h2 className="mt-1 font-display text-xl font-semibold sm:text-2xl">
                    Reserve your seat
                  </h2>
                </div>
                <p className="text-xs text-white/60 sm:text-right">
                  Seats are limited to keep cohorts small.
                </p>
              </div>
              <RegistrationForm />
            </div>

            <ContactCard />
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-[color:var(--bcad-navy-950)]/80 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-center text-xs text-white/50 sm:flex-row sm:px-6 sm:text-left">
          <p>© {new Date().getFullYear()} BCAD Consulting. All rights reserved.</p>
          <p>Nuna, Ethiopia · www.bcadconsulting.com</p>
        </div>
      </footer>
    </div>
  );
}

function ContactCard() {
  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm text-white/80">
      <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/50">
        Need help registering?
      </p>
      <ul className="space-y-3">
        <li className="flex items-center gap-3">
          <Icon>✉</Icon>
          <a
            href="mailto:training@bcadconsulting.com"
            className="hover:text-white"
          >
            training@bcadconsulting.com
          </a>
        </li>
        <li className="flex items-center gap-3">
          <Icon>☏</Icon>
          <div className="flex flex-col">
            <a href="tel:+251937933333" className="hover:text-white">
              +251 093 793 3333
            </a>
            <a href="tel:+251937333355" className="hover:text-white">
              +251 093 733 3355
            </a>
          </div>
        </li>
        <li className="flex items-center gap-3">
          <Icon>⌖</Icon>
          <span>Nuna, Ethiopia</span>
        </li>
      </ul>
    </div>
  );
}

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[color:var(--bcad-gold-500)]/15 text-[color:var(--bcad-gold-400)]">
      {children}
    </span>
  );
}

function BackgroundDecor() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-[color:var(--bcad-navy-800)]/60 via-[color:var(--bcad-navy-900)]/30 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-[color:var(--bcad-blue-500)]/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-[color:var(--bcad-gold-500)]/15 blur-3xl"
      />
    </>
  );
}
