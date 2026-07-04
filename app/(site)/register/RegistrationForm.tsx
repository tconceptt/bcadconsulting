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
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--bcad-ink-600)]/60 transition focus:outline-none focus:ring-2 focus:ring-[color:var(--bcad-gold-500)]/50";

function fieldClass(hasError: boolean | undefined) {
  return `${inputBase} ${
    hasError
      ? "border-[color:var(--bcad-red-500)]/70 focus:border-[color:var(--bcad-red-500)]"
      : "border-[color:var(--bcad-line-200)] focus:border-[color:var(--bcad-gold-500)]"
  }`;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--bcad-gold-500)] px-8 py-4 text-base font-semibold text-[color:var(--bcad-navy-950)] transition hover:bg-[color:var(--bcad-gold-400)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
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
        <div className="rounded-2xl border border-[color:var(--bcad-line-200)] bg-[color:var(--bcad-mist-50)] p-8">
          <h3 className="font-display text-2xl font-semibold text-[color:var(--foreground)]">
            You&rsquo;re on the list.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--bcad-ink-600)]">
            {state.message}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--bcad-ink-700)]">
            To secure your seat, please complete the{" "}
            <span className="font-semibold">20,000 ETB</span> training fee via
            QR payment.
          </p>
          <button
            type="button"
            onClick={() => setPaymentDismissed(false)}
            className="mt-5 inline-flex items-center rounded-full bg-[color:var(--bcad-gold-500)] px-6 py-3 text-sm font-semibold text-[color:var(--bcad-navy-950)] transition hover:bg-[color:var(--bcad-gold-400)]"
          >
            Show payment QR
          </button>
          <p className="mt-6 text-sm text-[color:var(--bcad-ink-600)]">
            Questions?{" "}
            <a
              href="mailto:training@bcadconsulting.com"
              className="font-medium text-[color:var(--bcad-navy-700)] hover:underline"
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
        <legend className="mb-2 block text-sm font-medium text-[color:var(--bcad-ink-700)]">
          Preferred session{" "}
          <span className="text-[color:var(--bcad-gold-700)]">*</span>
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
        <p className="mt-2 text-xs leading-relaxed text-[color:var(--bcad-ink-600)]">
          The evening session runs only if enough applicants choose it. If it
          can&rsquo;t be scheduled, we&rsquo;ll help you move to a morning or
          afternoon slot.
        </p>
        {errors.session && <ErrorText>{errors.session}</ErrorText>}
      </fieldset>

      {state.status === "error" && (
        <p className="rounded-lg border border-[color:var(--bcad-red-500)]/40 bg-[color:var(--bcad-red-500)]/10 px-4 py-3 text-sm text-[color:var(--bcad-red-500)]">
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-4 border-t border-[color:var(--bcad-line-200)] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[color:var(--bcad-ink-600)]">
          Training fee:{" "}
          <span className="font-semibold text-[color:var(--foreground)]">
            20,000 ETB
          </span>
          , paid by QR after you submit.
        </p>
        <SubmitButton />
      </div>

      <p className="text-xs leading-relaxed text-[color:var(--bcad-ink-600)]">
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
      className="mb-2 block text-sm font-medium text-[color:var(--bcad-ink-700)]"
    >
      {children}
      {required && (
        <span className="ml-1 text-[color:var(--bcad-gold-700)]">*</span>
      )}
    </label>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1.5 text-xs text-[color:var(--bcad-red-500)]">{children}</p>
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
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[color:var(--bcad-line-200)] bg-white p-4 transition hover:border-[color:var(--bcad-gold-500)]/60 has-[:checked]:border-[color:var(--bcad-gold-500)] has-[:checked]:bg-[color:var(--bcad-mist-50)]">
      <input
        type="radio"
        name="session"
        value={value}
        className="mt-1 h-4 w-4 accent-[color:var(--bcad-gold-700)]"
      />
      <span className="flex flex-col">
        <span className="text-sm font-semibold text-[color:var(--foreground)]">
          {title}
        </span>
        <span className="text-xs text-[color:var(--bcad-ink-600)]">
          {subtitle}
        </span>
      </span>
    </label>
  );
}
