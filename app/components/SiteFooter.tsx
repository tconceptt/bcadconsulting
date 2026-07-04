import Image from "next/image";
import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About us" },
  { href: "/training", label: "Training" },
  { href: "/register", label: "Register" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[color:var(--bcad-navy-950)] text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <Image
              src="/bcad-logo.png"
              alt=""
              width={1181}
              height={1181}
              className="h-10 w-10 rounded-lg"
            />
            <p className="font-display text-lg font-semibold">
              BCaD Consulting Management PLC
            </p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Spurring innovation and entrepreneurship in Ethiopia since 1998 —
            through consulting, training, renewable energy, and services that
            help enterprises grow.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-sm font-semibold text-[color:var(--bcad-gold-400)]">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold text-[color:var(--bcad-gold-400)]">
            Get in touch
          </p>
          <address className="mt-4 space-y-2.5 text-sm not-italic leading-relaxed text-white/75">
            <p>
              4th floor, Lebu Commercial Center
              <br />
              P.O. Box 11194, Addis Ababa, Ethiopia
            </p>
            <p>
              <a href="tel:+251114712993" className="transition hover:text-white">
                +251 11 471 2993
              </a>
            </p>
            <p>
              <a
                href="mailto:bcadconsulting@gmail.com"
                className="transition hover:text-white"
              >
                bcadconsulting@gmail.com
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-center text-xs text-white/50 sm:flex-row sm:px-6 sm:text-left">
          <p>
            © {new Date().getFullYear()} BCaD Consulting Management PLC. All
            rights reserved.
          </p>
          <p>Spurring Innovation &amp; Entrepreneurship</p>
        </div>
      </div>
    </footer>
  );
}
