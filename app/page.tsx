import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center bg-[color:var(--bcad-navy-950)] text-white">
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--bcad-gold-400)]">
          BCAD Consulting
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Something purposeful is being built here.
        </h1>
        <p className="max-w-xl text-base text-white/70">
          Our new website is on the way. In the meantime, register for our
          upcoming 4-week intensive training for aspiring entrepreneurs.
        </p>
        <Link
          href="/register"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-[color:var(--bcad-gold-500)] px-7 py-3 text-sm font-semibold text-[color:var(--bcad-navy-950)] transition hover:bg-[color:var(--bcad-gold-400)]"
        >
          Register for the training
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
