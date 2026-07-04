"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Bank = "awash" | "cbe";

const BANKS: Record<Bank, { label: string; src: string; alt: string }> = {
  awash: {
    label: "Awash Bank",
    src: "/QR-payment.jpeg",
    alt: "Awash Bank payment QR code for BCaD Consulting training",
  },
  cbe: {
    label: "CBE",
    src: "/CBE-QR.jpeg",
    alt: "Commercial Bank of Ethiopia payment QR code for BCaD Consulting training",
  },
};

export function PaymentModal({ onClose }: { onClose: () => void }) {
  const [bank, setBank] = useState<Bank>("awash");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const active = BANKS[bank];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-modal-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="relative max-h-[95vh] w-full max-w-md overflow-y-auto rounded-2xl bg-[color:var(--bcad-navy-900)] p-5 text-white shadow-2xl shadow-black/60 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close payment dialog"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:bg-white/15"
        >
          ✕
        </button>

        <div className="text-center">
          <p className="text-sm font-medium text-[color:var(--bcad-gold-400)]">
            Complete your payment
          </p>
          <h2
            id="payment-modal-title"
            className="mt-2 font-display text-2xl font-semibold sm:text-3xl"
          >
            Scan to pay &amp; confirm your seat
          </h2>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-white/60">Training fee</p>
              <p className="mt-1 font-display text-2xl font-semibold text-[color:var(--bcad-gold-400)]">
                20,000 ETB
              </p>
            </div>
            <div className="text-right text-sm text-white/60">
              <p>Deposit to</p>
              <p className="mt-1 font-semibold text-white">{active.label}</p>
            </div>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Select deposit bank"
          className="mt-5 grid grid-cols-2 gap-2 rounded-full border border-white/10 bg-white/5 p-1"
        >
          {(Object.keys(BANKS) as Bank[]).map((key) => {
            const isActive = key === bank;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setBank(key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[color:var(--bcad-gold-400)] text-[color:var(--bcad-navy-950)] shadow"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {BANKS[key].label}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex justify-center">
          <Image
            key={bank}
            src={active.src}
            alt={active.alt}
            width={856}
            height={1280}
            className="h-auto w-full max-w-[240px] rounded-2xl shadow-xl shadow-black/40 sm:max-w-[280px]"
            sizes="(max-width: 640px) 240px, 280px"
            priority
          />
        </div>

        <div className="mt-6 space-y-3 rounded-2xl border border-[color:var(--bcad-gold-400)]/30 bg-[color:var(--bcad-gold-400)]/5 p-4 text-sm leading-relaxed text-white/85">
          <p>
            <span className="font-semibold text-[color:var(--bcad-gold-400)]">
              How to pay:
            </span>{" "}
            Open any Ethiopian banking app, choose &ldquo;Scan to Pay&rdquo;,
            and scan either QR above. Both QRs can be scanned from any banking
            app to deposit into{" "}
            <span className="font-semibold text-white">Awash Bank</span> or{" "}
            <span className="font-semibold text-white">CBE</span>.
          </p>
          <p className="text-xs text-white/60">
            After paying, please keep your transaction reference. Our team will
            verify and contact you within 24 hours to confirm your seat.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
        >
          I&rsquo;ve completed payment
        </button>
      </div>
    </div>
  );
}
