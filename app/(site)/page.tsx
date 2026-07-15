import Image from "next/image";
import Link from "next/link";
import { KeyLineArt } from "../components/KeyLineArt";
import { PartnersMarquee } from "../components/PartnersMarquee";

// Logos live in /public/Logos. Order interleaves international funders with the
// regional institutions and enterprises so both marquee rows read as a mix.
const trustLogos = [
  { file: "usaid.png", name: "USAID" },
  { file: "world-bank.png", name: "The World Bank" },
  { file: "giz.png", name: "GIZ — Deutsche Gesellschaft für Internationale Zusammenarbeit" },
  { file: "oxfam.png", name: "Oxfam" },
  { file: "wfp.png", name: "World Food Programme" },
  { file: "un-women.png", name: "UN Women" },
  { file: "care.png", name: "CARE" },
  { file: "itc.png", name: "International Trade Centre" },
  { file: "snv.png", name: "SNV Netherlands Development Organisation" },
  { file: "uneca.png", name: "UN Economic Commission for Africa" },
  { file: "palladium.png", name: "Palladium" },
  { file: "ipa.png", name: "Innovations for Poverty Action" },
  { file: "dsw.png", name: "Deutsche Stiftung Weltbevölkerung" },
  { file: "cnfa.png", name: "CNFA" },
  { file: "cefe.png", name: "CEFE International" },
  { file: "valuelinks.png", name: "ValueLinks" },
  { file: "dvv-international.png", name: "DVV International" },
  { file: "kuhne-foundation.png", name: "Kühne Foundation" },
  { file: "ita.png", name: "Italian Trade Agency" },
  { file: "cde.png", name: "Centre for the Development of Enterprise" },
  { file: "benefit.png", name: "BENEFIT Partnership" },
  { file: "iirr.png", name: "International Institute of Rural Reconstruction" },
  { file: "psi.png", name: "Population Services International" },
  { file: "dashen-bank.png", name: "Dashen Bank" },
  { file: "ethiopian-chamber.png", name: "Ethiopian Chamber of Commerce & Sectoral Associations" },
  { file: "addis-chamber.png", name: "Addis Ababa Chamber of Commerce & Sectoral Associations" },
  { file: "ccrda.png", name: "Consortium of Christian Relief & Development Associations" },
  { file: "mowie.png", name: "Ethiopian Ministry of Water, Irrigation & Energy" },
  { file: "entag.png", name: "Ethiopian-Netherlands Trade for Agricultural Growth" },
  { file: "kontoor.png", name: "Kontoor Brands" },
  { file: "childrens-place.png", name: "The Children's Place" },
  { file: "savio.png", name: "Savio" },
  { file: "alfa-systems.png", name: "Alfa Systems" },
  { file: "fadis.png", name: "FADIS Textile Machinery" },
  { file: "flexi-personnel.png", name: "Flexi Personnel" },
  { file: "mti-consulting.png", name: "MTI Consulting" },
];

const practices = [
  {
    n: "01",
    href: "/services#consulting",
    name: "Management consulting",
    body: "Business diagnosis, strategy, and value chain development with internationally anchored tools — CEFE, ValueLinks, and ITC's Business Management Systems.",
  },
  {
    n: "02",
    href: "/services#bpo",
    name: "BPO & HR services",
    body: "Recruitment, payroll, compliance, and back-office capacity for organizations that need dependable operations in Ethiopia.",
  },
  {
    n: "03",
    href: "/services#solar",
    name: "Renewable energy",
    body: "Ketir Solar imports and distributes solar equipment to rural areas where electricity is what stands between a family and a working business.",
  },
  {
    n: "04",
    href: "/services#dietetics",
    name: "Dietetic counselling",
    body: "Bekidmia — 'first things first' in Amharic — helps individuals and workplaces eat well enough to work well.",
  },
];

const engagements = [
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
    role: "Business diagnostics, supply chain learning, and export readiness for African women entrepreneurs.",
  },
  {
    period: "Ongoing",
    partner: "GIZ · CEFE International",
    role: "Partner promoting the CEFE entrepreneurship methodology in Ethiopia and Africa.",
  },
];

const partners = [
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
      {/* Hero — navy drench, the key drawing itself across the dark */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 20% 0%, var(--ks-navy-glow) 0%, var(--ks-navy) 55%)",
        }}
      >
        <KeyLineArt className="pointer-events-none absolute -right-24 bottom-10 hidden w-[52rem] text-white/[0.14] lg:block" />
        <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-20 sm:px-6 sm:pb-32 sm:pt-28">
          <h1 className="ks-rise max-w-4xl font-display text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.02] tracking-[-0.02em]">
            Enterprise,
            <br />
            <span className="text-[color:var(--ks-gold)]">unlocked.</span>
          </h1>
          <p className="ks-rise ks-rise-2 mt-8 max-w-xl text-lg leading-[1.75] text-white/80 sm:text-xl">
            Since 1998, BCaD Consulting has helped Ethiopian entrepreneurs,
            enterprises, and development programs turn locked potential into
            working businesses.
          </p>
          <div className="ks-rise ks-rise-3 mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/services"
              className="ks-btn px-8 py-4 font-display text-sm font-semibold text-[color:var(--ks-navy)]"
              style={{ backgroundColor: "var(--ks-gold)" }}
            >
              What we do
            </Link>
            <Link
              href="/training"
              className="ks-btn border border-white/40 px-8 py-4 font-display text-sm font-semibold text-white hover:bg-white/10"
            >
              Entrepreneurship training
            </Link>
          </div>
          <p className="ks-rise ks-rise-4 mt-16 max-w-md text-sm leading-relaxed text-white/55">
            Management consulting · BPO &amp; HR · Renewable energy ·
            Dietetics — from Addis Ababa, across seven African countries.
          </p>
        </div>
      </section>

      {/* The claim + the practice index — white, typographic */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="max-w-3xl font-display text-2xl font-medium leading-[1.5] sm:text-3xl">
          Development work is judged by what actually reaches people.{" "}
          <span className="text-[color:var(--ks-blue)]">
            So is a consulting firm.
          </span>
        </p>
        <p className="mt-6 max-w-2xl text-lg leading-[1.75] text-[color:var(--ks-ink)]">
          We&rsquo;ve carried the EU&rsquo;s private sector program, powered
          USADF&rsquo;s off-grid energy work, and trained thousands of
          entrepreneurs across every Ethiopian region — one working business
          at a time.{" "}
          <Link
            href="/about"
            className="font-semibold text-[color:var(--ks-blue)] underline-offset-4 hover:underline"
          >
            Our story since 1998 →
          </Link>
        </p>

        <div className="mt-16">
          {practices.map((p) => (
            <Link
              key={p.n}
              href={p.href}
              className="ks-row group grid gap-x-8 gap-y-2 border-t border-[color:var(--ks-line)] py-8 sm:grid-cols-[4rem_1fr_auto] sm:items-center"
            >
              <span className="text-sm font-semibold tabular-nums text-[color:var(--ks-navy)]/40">
                {p.n}
              </span>
              <span>
                <span className="ks-name block font-display text-[clamp(1.5rem,3.2vw,2.4rem)] font-bold leading-tight tracking-[-0.01em] text-[color:var(--ks-navy)]">
                  {p.name}
                </span>
                <span className="mt-2 block max-w-2xl leading-relaxed text-[color:var(--ks-ink)]">
                  {p.body}
                </span>
              </span>
              <span
                aria-hidden
                className="ks-arrow hidden text-2xl text-[color:var(--ks-gold-deep)] sm:block"
              >
                →
              </span>
            </Link>
          ))}
          <div className="border-t border-[color:var(--ks-line)]" />
        </div>
      </section>

      {/* Track record — navy, the key built from the page itself */}
      <section className="text-white" style={{ backgroundColor: "var(--ks-navy)" }}>
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                Trusted with the{" "}
                <span className="text-[color:var(--ks-gold)]">
                  hard programs.
                </span>
              </h2>
              <p className="mt-5 max-w-md leading-[1.75] text-white/75">
                When funders need a partner who can reach the last mile —
                rural energy, women&rsquo;s enterprise, displaced people
                starting again — they&rsquo;ve called us. For 27 years.
              </p>

              {/* The bow of the key is a real entrepreneur; the shaft is the page */}
              <figure className="mt-12">
                <div className="relative flex items-center">
                  <div
                    className="relative aspect-square w-48 flex-shrink-0 overflow-hidden rounded-full sm:w-60"
                    style={{ boxShadow: "0 0 0 3px var(--ks-gold)" }}
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1572851569977-e18b9ea6edbe?auto=format&fit=crop&w=900&q=80"
                      alt="Produce stalls on a busy Ethiopian market street — the kind of enterprise BCaD exists to unlock"
                      fill
                      sizes="(max-width: 640px) 192px, 240px"
                      className="object-cover"
                      style={{ filter: "grayscale(35%) contrast(1.05)" }}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 mix-blend-multiply"
                      style={{ backgroundColor: "rgba(15,44,76,0.33)" }}
                    />
                  </div>
                  <div
                    aria-hidden
                    className="relative h-[10px] min-w-0 flex-1"
                    style={{ backgroundColor: "var(--ks-gold)" }}
                  >
                    <span
                      className="absolute right-10 top-0 h-8 w-[10px]"
                      style={{ backgroundColor: "var(--ks-gold)" }}
                    />
                    <span
                      className="absolute right-0 top-0 h-12 w-[10px]"
                      style={{ backgroundColor: "var(--ks-gold)" }}
                    />
                  </div>
                </div>
                <figcaption className="mt-4 text-sm text-white/55">
                  Enterprise is the key. Everything we do exists to turn it.
                </figcaption>
              </figure>
            </div>

            <div className="lg:pt-2">
              {engagements.map((t, i) => (
                <div
                  key={t.partner}
                  className={`py-6 ${i > 0 ? "border-t border-white/15" : "pt-0"}`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="font-display text-lg font-bold">
                      {t.partner}
                    </h3>
                    <p className="text-sm font-semibold tabular-nums text-[color:var(--ks-gold)]">
                      {t.period}
                    </p>
                  </div>
                  <p className="mt-2 max-w-xl leading-relaxed text-white/75">
                    {t.role}
                  </p>
                </div>
              ))}
              <p className="mt-8 border-t border-white/15 pt-6 leading-loose text-white/60">
                In the field with{" "}
                {partners.map((c, i) => (
                  <span key={c} className="whitespace-nowrap">
                    <span className="font-semibold text-white/85">{c}</span>
                    {i < partners.length - 1 && (
                      <span aria-hidden className="text-[color:var(--ks-gold)]">
                        {" · "}
                      </span>
                    )}
                  </span>
                ))}{" "}
                — and thousands of enterprising Ethiopians through their
                programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners that trust us — the track record made visible, in motion */}
      <PartnersMarquee partners={trustLogos} />

      {/* Training — drenched in Entrepreneurship Teal, the color earning its name */}
      <section style={{ backgroundColor: "var(--ks-teal)", color: "var(--ks-navy)" }}>
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
          <div>
            <h2 className="max-w-2xl font-display text-[clamp(2.2rem,4.5vw,3.4rem)] font-bold leading-[1.08] tracking-[-0.015em]">
              Got a business idea that won&rsquo;t leave you alone?
            </h2>
            <p className="mt-6 max-w-xl text-lg font-medium leading-[1.7]">
              <strong>Building a Purpose-Driven Business</strong> is our
              four-week intensive for aspiring entrepreneurs. Find the idea
              worth your life — and leave with a business plan you can act
              on. Small cohorts, real coaching, 27 years of method behind it.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="ks-btn px-8 py-4 font-display text-sm font-semibold text-white"
                style={{ backgroundColor: "var(--ks-navy)" }}
              >
                Reserve your seat
              </Link>
              <Link
                href="/training"
                className="font-display text-sm font-semibold underline decoration-2 underline-offset-4"
              >
                Course details
              </Link>
            </div>
          </div>
          <div
            className="relative hidden aspect-[4/5] overflow-hidden lg:block"
            style={{ boxShadow: "12px 12px 0 0 var(--ks-navy)" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1630861412757-d9743d318312?auto=format&fit=crop&w=1000&q=80"
              alt="Hands pouring coffee during an Ethiopian coffee ceremony — craft, patience, and enterprise in one ritual"
              fill
              sizes="(max-width: 1280px) 40vw, 480px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Closing — white, one question */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.08] tracking-[-0.015em] text-[color:var(--ks-navy)]">
            What could you do with{" "}
            <span className="text-[color:var(--ks-blue)]">the right key?</span>
          </h2>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Link
              href="/contact"
              className="ks-btn px-8 py-4 font-display text-sm font-semibold text-white"
              style={{ backgroundColor: "var(--ks-blue)" }}
            >
              Start a conversation
            </Link>
            <Link
              href="/services"
              className="ks-btn border px-8 py-4 font-display text-sm font-semibold text-[color:var(--ks-navy)]"
              style={{ borderColor: "rgba(15,44,76,0.3)" }}
            >
              Explore our services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
