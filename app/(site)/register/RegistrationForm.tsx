"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { PaymentModal } from "./PaymentModal";
import {
  submitRegistration,
  type RegistrationState,
} from "./actions";

const initialState: RegistrationState = {
  status: "idle",
  message: "",
};

const inputBase =
  "w-full rounded-[4px] border bg-white px-4 py-3 text-sm text-[color:var(--ks-navy)] placeholder:text-[color:var(--ks-ink)]/60 transition focus:outline-none focus:ring-2 focus:ring-[color:var(--ks-blue)]/30";

function fieldClass(hasError: boolean | undefined) {
  return `${inputBase} ${
    hasError
      ? "border-[color:var(--ks-red)]/70 focus:border-[color:var(--ks-red)]"
      : "border-[color:var(--ks-line)] focus:border-[color:var(--ks-blue)]"
  }`;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="ks-btn inline-flex w-full items-center justify-center gap-2 px-8 py-4 font-display text-base font-semibold text-[color:var(--ks-navy)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      style={{ backgroundColor: "var(--ks-gold)" }}
    >
      {pending ? "Submitting…" : "Reserve my seat"}
    </button>
  );
}

export function RegistrationForm() {
  const [state, formAction] = useActionState(submitRegistration, initialState);
  const [paymentDismissed, setPaymentDismissed] = useState(false);
  const errors = state.fieldErrors ?? {};
  const paymentOpen = state.status === "success" && !paymentDismissed;

  if (state.status === "success") {
    return (
      <>
        <div
          className="border border-[color:var(--ks-line)] bg-white p-8"
          style={{ borderTop: "3px solid var(--ks-gold)" }}
        >
          <h3 className="font-display text-2xl font-bold text-[color:var(--ks-navy)]">
            You&rsquo;re on the list.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--ks-ink)]">
            {state.message}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--ks-navy)]">
            To secure your seat, please complete the{" "}
            <span className="font-semibold">20,000 ETB</span> training fee via
            QR payment.
          </p>
          <button
            type="button"
            onClick={() => setPaymentDismissed(false)}
            className="ks-btn mt-5 inline-flex items-center px-6 py-3 font-display text-sm font-semibold text-[color:var(--ks-navy)]"
            style={{ backgroundColor: "var(--ks-gold)" }}
          >
            Show payment QR
          </button>
          <p className="mt-6 text-sm text-[color:var(--ks-ink)]">
            Questions?{" "}
            <a
              href="mailto:training@bcadconsulting.com"
              className="font-medium text-[color:var(--ks-blue)] hover:underline"
            >
              training@bcadconsulting.com
            </a>
          </p>
        </div>
        {paymentOpen && (
          <PaymentModal onClose={() => setPaymentDismissed(true)} />
        )}
      </>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Full name"
          name="fullName"
          required
          error={errors.fullName}
          autoComplete="name"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          error={errors.email}
          autoComplete="email"
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          required
          error={errors.phone}
          autoComplete="tel"
          placeholder="+251 9XX XXX XXX"
        />
        <Field
          label="City"
          name="city"
          required
          error={errors.city}
          placeholder="Addis Ababa"
        />
      </div>

      <div>
        <Label htmlFor="background">Professional background</Label>
        <input
          id="background"
          name="background"
          type="text"
          placeholder="e.g. University student, NGO staff, shop owner"
          className={fieldClass(false)}
        />
      </div>

      <div>
        <Label htmlFor="businessIdea" required>
          What business idea or industry interests you?
        </Label>
        <textarea
          id="businessIdea"
          name="businessIdea"
          rows={3}
          className={fieldClass(!!errors.businessIdea)}
          placeholder="e.g. agribusiness in Oromia, a coffee export brand, a tech service for SMEs in Addis…"
        />
        {errors.businessIdea && <ErrorText>{errors.businessIdea}</ErrorText>}
      </div>

      <div>
        <Label htmlFor="experience" required>
          Entrepreneurial experience
        </Label>
        <select
          id="experience"
          name="experience"
          defaultValue=""
          className={fieldClass(!!errors.experience)}
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="just-an-idea">Just an idea — exploring</option>
          <option value="early-stage">Early-stage / pre-revenue</option>
          <option value="running">Running a business already</option>
          <option value="returning">Returning / pivoting</option>
        </select>
        {errors.experience && <ErrorText>{errors.experience}</ErrorText>}
      </div>

      <fieldset>
        <legend className="mb-2 block text-sm font-medium text-[color:var(--ks-navy)]">
          Preferred session{" "}
          <span className="text-[color:var(--ks-gold-deep)]">*</span>
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <SessionOption
            value="morning"
            title="Morning"
            subtitle="8:30 – 12:00"
          />
          <SessionOption
            value="afternoon"
            title="Afternoon"
            subtitle="1:30 – 5:00 pm"
          />
          <SessionOption
            value="evening"
            title="Evening"
            subtitle="6:00 – 8:00 pm"
          />
          <SessionOption
            value="flexible"
            title="I'm flexible"
            subtitle="Help me choose a session"
          />
        </div>
        <p className="mt-2 text-xs leading-relaxed text-[color:var(--ks-ink)]">
          The evening session runs only if enough applicants choose it. If it
          can&rsquo;t be scheduled, we&rsquo;ll help you move to a morning or
          afternoon slot.
        </p>
        {errors.session && <ErrorText>{errors.session}</ErrorText>}
      </fieldset>

      {state.status === "error" && (
        <p className="rounded-[4px] border border-[color:var(--ks-red)]/40 bg-[color:var(--ks-red)]/10 px-4 py-3 text-sm text-[color:var(--ks-red)]">
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-4 border-t border-[color:var(--ks-line)] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[color:var(--ks-ink)]">
          Training fee:{" "}
          <span className="font-semibold text-[color:var(--ks-navy)]">
            20,000 ETB
          </span>
          , paid by QR after you submit.
        </p>
        <SubmitButton />
      </div>

      <p className="text-xs leading-relaxed text-[color:var(--ks-ink)]">
        By registering, you agree to receive program updates from BCaD
        Consulting.
      </p>
    </form>
  );
}

function Label({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-medium text-[color:var(--ks-navy)]"
    >
      {children}
      {required && (
        <span className="ml-1 text-[color:var(--ks-gold-deep)]">*</span>
      )}
    </label>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1.5 text-xs text-[color:var(--ks-red)]">{children}</p>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={fieldClass(!!error)}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function SessionOption({
  value,
  title,
  subtitle,
}: {
  value: string;
  title: string;
  subtitle: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-[4px] border border-[color:var(--ks-line)] bg-white p-4 transition hover:border-[color:var(--ks-blue)]/60 has-[:checked]:border-[color:var(--ks-blue)] has-[:checked]:bg-[color:var(--ks-soft)]">
      <input
        type="radio"
        name="session"
        value={value}
        className="mt-1 h-4 w-4 accent-[color:var(--ks-blue)]"
      />
      <span className="flex flex-col">
        <span className="text-sm font-semibold text-[color:var(--ks-navy)]">
          {title}
        </span>
        <span className="text-xs text-[color:var(--ks-ink)]">
          {subtitle}
        </span>
      </span>
    </label>
  );
}
