/*
 * Partners That Trust Us — an infinite, two-row logo marquee.
 *
 * Pure-CSS motion (see .ks-marquee in globals.css): each row renders its logo
 * set twice; the track scrolls a full -50% so the second copy seamlessly takes
 * over. Rows run in opposite directions for a bit of institutional life.
 * Hover pauses the belt and un-mutes the logos; prefers-reduced-motion collapses
 * both rows into a single static, wrapped grid.
 */

type Partner = {
  /** file in /public/Logos */
  file: string;
  /** organisation name, used as alt text */
  name: string;
};

function Row({
  partners,
  reverse = false,
  duration,
}: {
  partners: Partner[];
  reverse?: boolean;
  duration: number;
}) {
  return (
    <div
      className="ks-marquee"
      style={{ ["--ks-marquee-duration" as string]: `${duration}s` }}
    >
      <div
        className={`ks-marquee-track${
          reverse ? " ks-marquee-track--reverse" : ""
        }`}
      >
        {/* two identical sets side by side — the second seamlessly follows */}
        {[false, true].map((isClone) => (
          <ul
            key={isClone ? "clone" : "base"}
            data-clone={isClone ? "true" : undefined}
            aria-hidden={isClone ? true : undefined}
            className="ks-marquee-set m-0 list-none gap-14 px-7"
          >
            {partners.map((p) => (
              <li key={p.file} className="flex items-center">
                {/* Plain img: logos have wildly varying intrinsic sizes; a fixed
                    height with auto width keeps the belt visually even. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/Logos/${p.file}`}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  className="ks-logo"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function PartnersMarquee({ partners }: { partners: Partner[] }) {
  // Split into two belts so the rows don't mirror each other.
  const mid = Math.ceil(partners.length / 2);
  const rowA = partners.slice(0, mid);
  const rowB = partners.slice(mid);

  return (
    <section
      aria-labelledby="partners-heading"
      style={{ backgroundColor: "var(--ks-soft)" }}
      className="border-y border-[color:var(--ks-line)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="partners-heading"
            className="font-display text-3xl font-bold leading-tight tracking-[-0.01em] text-[color:var(--ks-navy)] sm:text-4xl"
          >
            Partners that{" "}
            <span className="text-[color:var(--ks-blue)]">trust us.</span>
          </h2>
          <p className="max-w-md text-[color:var(--ks-ink)] sm:text-right">
            Funders, ministries, and enterprises who have put programs in our
            hands — across seven African countries.
          </p>
        </div>
      </div>

      {/* full-bleed belts */}
      <div className="flex flex-col gap-8 pb-20 sm:pb-24">
        <Row partners={rowA} duration={64} />
        <Row partners={rowB} reverse duration={76} />
      </div>
    </section>
  );
}
