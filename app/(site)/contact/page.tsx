import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to BCaD Consulting about consulting engagements, training, HR outsourcing, or solar equipment. Offices at Lebu Commercial Center, Addis Ababa.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="bg-[color:var(--bcad-navy-950)] text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h1 className="max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Let&rsquo;s talk about your work.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
            Whether you&rsquo;re planning a project, exploring a partnership, or
            just have a question — write to us. A consultant, not a bot, will
            reply.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div>
          <h2 className="font-display text-2xl font-semibold text-[color:var(--foreground)]">
            Send us a message
          </h2>
          <p className="mt-2 mb-8 text-sm text-[color:var(--bcad-ink-600)]">
            We usually respond within two working days.
          </p>
          <ContactForm />
        </div>

        <aside className="space-y-8 lg:pt-14">
          <div className="rounded-2xl bg-[color:var(--bcad-mist-50)] p-7">
            <h2 className="font-display text-xl font-semibold text-[color:var(--foreground)]">
              Visit or call
            </h2>
            <address className="mt-4 space-y-4 text-sm not-italic leading-relaxed text-[color:var(--bcad-ink-600)]">
              <p>
                Q. 01, 4th floor, Lebu Commercial Center
                <br />
                Woreda 01, Nifas Silk-Lafto
                <br />
                P.O. Box 11194, Addis Ababa, Ethiopia
              </p>
              <p>
                Tel:{" "}
                <a
                  href="tel:+251114712993"
                  className="font-medium text-[color:var(--bcad-navy-700)] hover:underline"
                >
                  +251 11 471 2993
                </a>
                <br />
                Fax: +251 11 471 2994
              </p>
              <p>
                <a
                  href="mailto:bcadconsulting@gmail.com"
                  className="font-medium text-[color:var(--bcad-navy-700)] hover:underline"
                >
                  bcadconsulting@gmail.com
                </a>
              </p>
            </address>
          </div>

          <div className="rounded-2xl border border-[color:var(--bcad-line-200)] p-7">
            <h2 className="font-display text-xl font-semibold text-[color:var(--foreground)]">
              Asking about the training?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--bcad-ink-600)]">
              For the entrepreneurship training program, reach the training team
              directly:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-[color:var(--bcad-ink-600)]">
              <li>
                <a
                  href="mailto:training@bcadconsulting.com"
                  className="font-medium text-[color:var(--bcad-navy-700)] hover:underline"
                >
                  training@bcadconsulting.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+251937933333"
                  className="font-medium text-[color:var(--bcad-navy-700)] hover:underline"
                >
                  +251 093 793 3333
                </a>
                {" · "}
                <a
                  href="tel:+251937333355"
                  className="font-medium text-[color:var(--bcad-navy-700)] hover:underline"
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
