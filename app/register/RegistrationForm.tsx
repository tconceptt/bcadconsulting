"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  submitRegistration,
  type RegistrationState,
} from "./actions";

const initialState: RegistrationState = {
  status: "idle",
  message: "",
};

const inputBase =
  "w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 transition focus:outline-none focus:ring-2 focus:ring-[color:var(--bcad-gold-400)]/60";

function fieldClass(hasError: boolean | undefined) {
  return `${inputBase} ${
    hasError
      ? "border-[color:var(--bcad-red-500)]/70 focus:border-[color:var(--bcad-red-500)]"
      : "border-white/10 focus:border-[color:var(--bcad-gold-400)]"
  }`;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--bcad-gold-500)] px-8 py-4 text-base font-semibold text-[color:var(--bcad-navy-950)] shadow-lg shadow-black/30 transition hover:bg-[color:var(--bcad-gold-400)] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Submitting…" : "Reserve my seat"}
      <span aria-hidden="true" className="transition group-hover:translate-x-1">
        →
      </span>
    </button>
  );
}

export function RegistrationForm() {
  const [state, formAction] = useActionState(submitRegistration, initialState);
  const errors = state.fieldErrors ?? {};

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-[color:var(--bcad-gold-400)]/40 bg-white/5 p-8 text-white">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--bcad-gold-500)] text-2xl text-[color:var(--bcad-navy-950)]">
          ✓
        </div>
        <h3 className="font-display text-2xl font-semibold">
          You&rsquo;re on the list.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          {state.message}
        </p>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-[color:var(--bcad-gold-400)]">
          Questions? training@bcadconsulting.com
        </p>
      </div>
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
          placeholder="Selamawit Tesfaye"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          error={errors.email}
          placeholder="selamawit@example.com"
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          required
          error={errors.phone}
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
        <legend className="mb-2 block text-sm font-medium text-white/80">
          Preferred session <span className="text-[color:var(--bcad-gold-400)]">*</span>
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <SessionOption
            value="in-person-evening"
            title="In-person — Evenings"
            subtitle="Nuna, Ethiopia · Mon/Wed/Fri"
          />
          <SessionOption
            value="in-person-weekend"
            title="In-person — Weekends"
            subtitle="Nuna, Ethiopia · Sat full-day"
          />
          <SessionOption
            value="virtual-evening"
            title="Virtual — Evenings"
            subtitle="Live online · Tue/Thu"
          />
          <SessionOption
            value="undecided"
            title="Not sure yet"
            subtitle="Help me choose what fits"
          />
        </div>
        {errors.session && <ErrorText>{errors.session}</ErrorText>}
      </fieldset>

      {state.status === "error" && (
        <p className="rounded-lg border border-[color:var(--bcad-red-500)]/40 bg-[color:var(--bcad-red-500)]/10 px-4 py-3 text-sm text-[color:var(--bcad-red-500)]">
          {state.message}
        </p>
      )}

      <SubmitButton />

      <p className="text-center text-xs text-white/50">
        By registering, you agree to receive program updates from BCAD
        Consulting. We never share your information.
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
      className="mb-2 block text-sm font-medium text-white/80"
    >
      {children}
      {required && (
        <span className="ml-1 text-[color:var(--bcad-gold-400)]">*</span>
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
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
    <label className="group relative flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-[color:var(--bcad-gold-400)]/60 has-[:checked]:border-[color:var(--bcad-gold-400)] has-[:checked]:bg-[color:var(--bcad-gold-400)]/10">
      <input
        type="radio"
        name="session"
        value={value}
        className="mt-1 h-4 w-4 accent-[color:var(--bcad-gold-500)]"
      />
      <span className="flex flex-col">
        <span className="text-sm font-semibold text-white">{title}</span>
        <span className="text-xs text-white/60">{subtitle}</span>
      </span>
    </label>
  );
}
