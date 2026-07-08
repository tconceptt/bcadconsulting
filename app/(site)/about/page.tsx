import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About us",
  description:
    "BCaD Consulting Management PLC has worked with Ethiopian entrepreneurs and international development partners since 1998 — from Addis Ababa to six African countries.",
};

const milestones = [
  {
    year: "1998",
    title: "Founded in Addis Ababa",
    body: "BCaD starts as a sole proprietorship under the commercial code of Ethiopia, offering management consulting and business development services.",
  },
  {
    year: "2006",
    title: "Technical Intervention Office for CDE",
    body: "We become CDE's office in Ethiopia for the ACP/EU private sector development program, a role we held through 2013.",
  },
  {
    year: "2010",
    title: "Incorporated as a PLC",
    body: "The firm becomes BCaD Consulting Management PLC, formalizing a growing multidisciplinary practice.",
  },
  {
    year: "2014",
    title: "Power Africa with USADF",
    body: "As a technical partner of the United States African Development Fund, we support and monitor the Power Africa Programme's off-grid energy work in Ethiopia until 2018.",
  },
  {
    year: "2018",
    title: "Ketir Solar Equipment Import",
    body: "We begin importing solar equipment and distributing it through last-mile channels to rural and peri-urban areas where electricity is badly needed to run businesses.",
  },
  {
    year: "2022",
    title: "Bekidmia Dietetic Services",
    body: "After seeing serious ailments among the workforce caused by unhealthy eating, we launch dietary counselling. Bekidmia is Amharic for 'first things first.'",
  },
];

const values = [
  {
    title: "Genuine work",
    body: "We deliver what we promise and say what we can't. High-quality, honest service has kept clients coming back for over 25 years.",
  },
  {
    title: "Professional ethics",
    body: "Our consultants hold themselves to professional standards in every engagement — with clients, communities, and each other.",
  },
  {
    title: "People and planet",
    body: "We took up renewable energy and healthy eating because we care about the well-being of people and the environment, not just balance sheets.",
  },
];

export default function AboutPage() {
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
          <h1 className="max-w-3xl font-display text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-tight tracking-[-0.02em]">
            Unlocking Ethiopian enterprise{" "}
            <span className="text-[color:var(--ks-gold)]">since 1998.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            BCaD Consulting Management PLC was established in 1998 and
            incorporated as a PLC in 2010. We are an Addis Ababa–based firm of
            consultants, trainers, and specialists who believe business
            problems can be turned into opportunities — and we&rsquo;ve built
            our practice around proving it.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-0">
          <div>
            <h2 className="font-display text-3xl font-bold text-[color:var(--ks-navy)]">
              Our vision
            </h2>
            <p className="mt-4 leading-[1.75] text-[color:var(--ks-ink)]">
              To lead in empowering private-sector leaders and managers —
              building their competence to create innovative businesses and to
              keep transforming business problems into opportunities. And
              because we care about people and the environment, we work in
              renewable energy and healthy eating too.
            </p>
          </div>
          <div className="lg:border-l lg:border-[color:var(--ks-line)] lg:pl-16">
            <h2 className="font-display text-3xl font-bold text-[color:var(--ks-navy)]">
              Our mission
            </h2>
            <p className="mt-4 leading-[1.75] text-[color:var(--ks-ink)]">
              To foster self-employment, income growth, and profitability for
              enterprises in Ethiopia and beyond — through business development
              services built on real demand, delivered with special care for
              the safety and well-being of humanity and the environment.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--ks-soft)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="font-display text-3xl font-bold text-[color:var(--ks-navy)]">
            How we got here
          </h2>
          <p className="mt-3 max-w-2xl text-[color:var(--ks-ink)]">
            The short version of a long story.
          </p>
          <ol className="relative mt-12 space-y-0 border-l border-[color:var(--ks-line)] pl-8">
            {milestones.map((m) => (
              <li key={m.year} className="relative pb-10 last:pb-0">
                <span
                  aria-hidden
                  className="absolute -left-[2.15rem] top-1.5 h-2 w-2 bg-[color:var(--ks-teal)]"
                />
                <p className="font-display text-2xl font-bold text-[color:var(--ks-gold-deep)]">
                  {m.year}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-[color:var(--ks-navy)]">
                  {m.title}
                </h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-[color:var(--ks-ink)]">
                  {m.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="font-display text-3xl font-bold text-[color:var(--ks-navy)]">
              What we stand for
            </h2>
            <div className="mt-8 space-y-8">
              {values.map((v) => (
                <div key={v.title}>
                  <h3 className="text-lg font-semibold text-[color:var(--ks-navy)]">
                    {v.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-[color:var(--ks-ink)]">
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-bold text-[color:var(--ks-navy)]">
              How we work
            </h2>
            <p className="mt-4 leading-[1.75] text-[color:var(--ks-ink)]">
              We keep a deliberately small core: ten full-time staff, including
              a principal consultant, two senior consultants, and two
              consultants. Around them sits a network of more than twenty
              outsourced professionals — trained on our consulting and training
              packages, working with us for years on call-off contracts.
            </p>
            <p className="mt-4 leading-[1.75] text-[color:var(--ks-ink)]">
              That structure lets us stay lean while fielding the right team
              for each engagement, using both custom-made models and
              internationally anchored tools — CEFE for entrepreneurship,
              ValueLinks for value chains, ITC&rsquo;s Business Management
              Systems for diagnostics, and the Modular Learning System for
              supply chain management, among others.
            </p>
            <p className="mt-4 leading-[1.75] text-[color:var(--ks-ink)]">
              Our CEO is a founding member of ValueLinks International and a
              distinguished service provider to GIZ&rsquo;s African value chain
              training and analysis program.
            </p>
          </div>
        </div>
      </section>

      <section
        className="text-white"
        style={{ backgroundColor: "var(--ks-navy)" }}
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="font-display text-3xl font-bold">
                Where we&rsquo;ve worked
              </h2>
              <p className="mt-4 leading-relaxed text-white/75">
                Beyond Ethiopia, we&rsquo;ve delivered assignments in Nigeria,
                South Sudan, the Democratic Republic of Congo, Tanzania, Kenya,
                and Egypt. At home, we&rsquo;ve covered every regional state —
                including Somali, Afar, Amhara, and Tigray.
              </p>
              <p className="mt-4 leading-relaxed text-white/75">
                Some of our hardest and proudest work has been in post-conflict
                settings: entrepreneurship training for displaced people
                returning from Eritrea, coordinating low-cost housing, and
                designing saving and credit facilities to help failed
                businesses restart.
              </p>
            </div>
            <div className="flex flex-col justify-center border border-white/20 p-8">
              <h3 className="font-display text-2xl font-bold">
                Work with us
              </h3>
              <p className="mt-3 leading-relaxed text-white/75">
                If your organization needs a partner that knows Ethiopian
                enterprise from the ground up, we should talk.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="ks-btn px-6 py-3 font-display text-sm font-semibold text-[color:var(--ks-navy)]"
                  style={{ backgroundColor: "var(--ks-gold)" }}
                >
                  Contact us
                </Link>
                <Link
                  href="/services"
                  className="ks-btn border border-white/40 px-6 py-3 font-display text-sm font-semibold text-white hover:bg-white/10"
                >
                  See our services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
