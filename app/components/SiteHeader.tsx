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
    <header
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm"
      style={{ borderBottom: "3px solid var(--ks-gold)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center">
          <Image
            src="/bcad-new.jpeg"
            alt="BCaD Consulting Management PLC — Spurring Innovation and Entrepreneurship"
            width={1280}
            height={700}
            priority
            className="-my-3 h-14 w-auto sm:h-16"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm transition-colors hover:text-[color:var(--ks-blue)] ${
                  active
                    ? "font-semibold text-[color:var(--ks-blue)]"
                    : "text-[color:var(--ks-ink)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/register"
            className="ks-btn px-5 py-2.5 font-display text-sm font-semibold text-white"
            style={{ backgroundColor: "var(--ks-blue)" }}
          >
            Register
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center border border-[color:var(--ks-line)] text-[color:var(--ks-navy)] md:hidden"
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
          className="border-t border-[color:var(--ks-line)] bg-white px-4 pb-6 pt-3 md:hidden"
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
                    className={`block border-b border-[color:var(--ks-line)] py-3.5 text-base ${
                      active
                        ? "font-semibold text-[color:var(--ks-blue)]"
                        : "text-[color:var(--ks-navy)]"
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
            className="ks-btn mt-5 inline-flex w-full items-center justify-center px-5 py-3 font-display text-sm font-semibold text-white"
            style={{ backgroundColor: "var(--ks-blue)" }}
          >
            Register
          </Link>
        </nav>
      )}
    </header>
  );
}
