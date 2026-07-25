"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Bank = "awash" | "cbe";

const BANKS: Record<
  Bank,
  { label: string; src: string; alt: string; accountNumber: string }
> = {
  awash: {
    label: "Awash Bank",
    src: "/QR-payment.jpeg",
    alt: "Awash Bank payment QR code for BCaD Consulting training",
    accountNumber: "013040776952800",
  },
  cbe: {
    label: "CBE",
    src: "/CBE-QR.jpeg",
    alt: "Commercial Bank of Ethiopia payment QR code for BCaD Consulting training",
    accountNumber: "1000267179062",
  },
};

const ACCOUNT_NAME = "BCaD Consulting Management PLC";

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard API unavailable (e.g. older in-app browsers) — fall back
      // to a hidden textarea so the copy still works.
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${label}`}
      className={`inline-flex flex-shrink-0 items-center gap-1 rounded-[3px] border px-2.5 py-1 text-xs font-semibold transition ${
        copied
          ? "border-[color:var(--ks-gold)] text-[color:var(--ks-gold)]"
          : "border-white/30 text-white/80 hover:bg-white/10 hover:text-white"
      }`}
    >
      {copied ? "Copied ✓" : "Copy"}
    </button>
  );
}

export function PaymentModal({
  amount,
  packageTitle,
  onClose,
}: {
  amount?: string;
  packageTitle?: string;
  onClose: () => void;
}) {
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
        className="relative max-h-[95vh] w-full max-w-md overflow-y-auto rounded-lg bg-[color:var(--ks-navy)] p-5 text-white shadow-2xl shadow-black/60 sm:p-7"
        style={{ borderTop: "3px solid var(--ks-gold)" }}
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
          <p className="text-sm font-semibold text-[color:var(--ks-gold)]">
            Complete your payment
          </p>
          <h2
            id="payment-modal-title"
            className="mt-2 font-display text-2xl font-bold sm:text-3xl"
          >
            Scan to pay &amp; confirm your seat
          </h2>
        </div>

        <div className="mt-6 border border-white/15 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-white/60">
                {packageTitle ? `${packageTitle} fee` : "Training fee"}
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-[color:var(--ks-gold)]">
                {amount ?? "2,000 – 20,000 ETB"}
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
          className="mt-5 grid grid-cols-2 gap-2 border border-white/15 p-1"
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
                className={`px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[color:var(--ks-gold)] text-[color:var(--ks-navy)]"
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
            className="h-auto w-full max-w-[240px] shadow-xl shadow-black/40 sm:max-w-[280px]"
            sizes="(max-width: 640px) 240px, 280px"
            priority
          />
        </div>

        <div className="mt-5 border border-white/15 p-4">
          <p className="text-sm font-semibold text-[color:var(--ks-gold)]">
            Prefer a direct transfer?
          </p>
          <p className="mt-1 text-xs text-white/60">
            Account name: <span className="text-white/85">{ACCOUNT_NAME}</span>
          </p>
          <ul className="mt-3 space-y-2">
            {(Object.keys(BANKS) as Bank[]).map((key) => (
              <li
                key={key}
                className="flex items-center justify-between gap-3 rounded-[3px] bg-white/5 px-3 py-2.5"
              >
                <span className="min-w-0">
                  <span className="block text-xs text-white/60">
                    {BANKS[key].label}
                  </span>
                  <span className="block truncate font-mono text-sm font-semibold tracking-wide text-white">
                    {BANKS[key].accountNumber}
                  </span>
                </span>
                <CopyButton
                  text={BANKS[key].accountNumber}
                  label={`${BANKS[key].label} account number`}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 space-y-3 border border-white/15 p-4 text-sm leading-relaxed text-white/85">
          <p>
            <span className="font-semibold text-[color:var(--ks-gold)]">
              How to pay:
            </span>{" "}
            Open any Ethiopian banking app, choose &ldquo;Scan to Pay&rdquo;,
            and scan either QR above — or transfer directly to one of the
            account numbers listed. Both routes deposit into{" "}
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
          className="mt-6 inline-flex w-full items-center justify-center border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          I&rsquo;ve completed payment
        </button>
      </div>
    </div>
  );
}
