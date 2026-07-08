"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "./actions";

const initialState: ContactState = {
  status: "idle",
  message: "",
};

const inputBase =
  "w-full rounded-[4px] border bg-white px-4 py-3 text-sm text-[color:var(--ks-navy)] placeholder:text-[color:var(--ks-ink)]/60 transition focus:outline-none focus:ring-2 focus:ring-[color:var(--ks-blue)]/30";

function fieldClass(hasError: boolean) {
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
      className="ks-btn inline-flex items-center justify-center gap-2 px-8 py-3.5 font-display text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
      style={{ backgroundColor: "var(--ks-blue)" }}
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
      <div
        className="border border-[color:var(--ks-line)] bg-white p-8"
        style={{ borderTop: "3px solid var(--ks-gold)" }}
      >
        <h3 className="font-display text-2xl font-bold text-[color:var(--ks-navy)]">
          Message received.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--ks-ink)]">
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
        <p className="rounded-[4px] border border-[color:var(--ks-red)]/40 bg-[color:var(--ks-red)]/10 px-4 py-3 text-sm text-[color:var(--ks-red)]">
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
