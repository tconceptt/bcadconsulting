"use client";

import Image from "next/image";
import { useEffect } from "react";

export function PaymentModal({ onClose }: { onClose: () => void }) {
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-modal-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="relative max-h-[95vh] w-full max-w-md overflow-y-auto rounded-3xl border border-white/15 bg-gradient-to-b from-[color:var(--bcad-navy-800)] to-[color:var(--bcad-navy-950)] p-5 text-white shadow-2xl shadow-black/60 sm:p-7"
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
          <p className="text-[10px] uppercase tracking-[0.35em] text-[color:var(--bcad-gold-400)]">
            Complete your payment
          </p>
          <h2
            id="payment-modal-title"
            className="mt-2 font-display text-2xl font-semibold sm:text-3xl"
          >
            Scan to pay & confirm your seat
          </h2>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">
                Training fee
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-[color:var(--bcad-gold-400)]">
                10,000 ETB
              </p>
            </div>
            <div className="text-right text-xs text-white/60">
              <p className="uppercase tracking-[0.2em] text-white/40">Deposit to</p>
              <p className="mt-1 font-semibold text-white">Awash Bank</p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <Image
            src="/QR-payment.jpeg"
            alt="Awash Bank payment QR code for BCAD Consulting training"
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
            and scan the QR above. The deposit will be made to{" "}
            <span className="font-semibold text-white">Awash Bank</span>.
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
