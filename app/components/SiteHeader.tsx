"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/training", label: "Training" },
  { href: "/contact", label: "Contact" },
  { href: "/options", label: "Options" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[color:var(--bcad-navy-950)]/95 text-white backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:h-[4.5rem] sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src="/bcad-logo.png"
            alt=""
            width={1181}
            height={1181}
            className="h-9 w-9 flex-shrink-0 rounded-lg sm:h-10 sm:w-10"
            priority
          />
          <span className="truncate font-display text-lg font-semibold tracking-wide">
            BCaD <span className="text-white/60">Consulting</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm transition hover:text-white ${
                  active
                    ? "font-semibold text-[color:var(--bcad-gold-400)]"
                    : "text-white/75"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/register"
            className="rounded-full bg-[color:var(--bcad-gold-500)] px-5 py-2.5 text-sm font-semibold text-[color:var(--bcad-navy-950)] transition hover:bg-[color:var(--bcad-gold-400)]"
          >
            Register for training
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 text-white md:hidden"
        >
          <span aria-hidden className="flex w-5 flex-col gap-1.5">
            <span
              className={`h-0.5 w-full rounded bg-current transition ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full rounded bg-current transition ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-full rounded bg-current transition ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-white/10 bg-[color:var(--bcad-navy-950)] px-4 pb-6 pt-3 md:hidden"
        >
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`block border-b border-white/10 py-3.5 text-base ${
                      active
                        ? "font-semibold text-[color:var(--bcad-gold-400)]"
                        : "text-white/85"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/register"
            onClick={() => setMenuOpen(false)}
            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[color:var(--bcad-gold-500)] px-5 py-3 text-sm font-semibold text-[color:var(--bcad-navy-950)]"
          >
            Register for training
          </Link>
        </nav>
      )}
    </header>
  );
}
