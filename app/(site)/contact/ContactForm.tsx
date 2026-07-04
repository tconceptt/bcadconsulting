"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "./actions";

const initialState: ContactState = {
  status: "idle",
  message: "",
};

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-[color:var(--foreground)] placeholder:text-[color:var(--bcad-ink-600)]/70 transition focus:outline-none focus:ring-2 focus:ring-[color:var(--bcad-gold-500)]/50";

function fieldClass(hasError: boolean) {
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
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--bcad-navy-900)] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[color:var(--bcad-navy-800)] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState);
  const errors = state.fieldErrors ?? {};

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-[color:var(--bcad-line-200)] bg-[color:var(--bcad-mist-50)] p-8">
        <h3 className="font-display text-2xl font-semibold text-[color:var(--foreground)]">
          Message received.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--bcad-ink-600)]">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName" required>
            Full name
          </Label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            className={fieldClass(!!errors.fullName)}
          />
          {errors.fullName && <ErrorText>{errors.fullName}</ErrorText>}
        </div>
        <div>
          <Label htmlFor="email" required>
            Email
          </Label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass(!!errors.email)}
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="organization">Organization</Label>
          <input
            id="organization"
            name="organization"
            type="text"
            autoComplete="organization"
            className={fieldClass(false)}
          />
        </div>
        <div>
          <Label htmlFor="topic">What is this about?</Label>
          <select id="topic" name="topic" defaultValue="" className={fieldClass(false)}>
            <option value="">Choose a topic (optional)</option>
            <option value="consulting">Consulting engagement</option>
            <option value="training">Training programs</option>
            <option value="hr-outsourcing">HR &amp; outsourcing</option>
            <option value="solar">Solar equipment</option>
            <option value="dietetics">Dietetic services</option>
            <option value="other">Something else</option>
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="message" required>
          Your message
        </Label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={fieldClass(!!errors.message)}
        />
        {errors.message && <ErrorText>{errors.message}</ErrorText>}
      </div>

      {state.status === "error" && (
        <p className="rounded-lg border border-[color:var(--bcad-red-500)]/40 bg-[color:var(--bcad-red-500)]/10 px-4 py-3 text-sm text-[color:var(--bcad-red-500)]">
          {state.message}
        </p>
      )}

      <SubmitButton />
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
