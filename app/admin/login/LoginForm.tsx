"use client";

import { useActionState } from "react";
import { requestLoginLink, type LoginState } from "./actions";

const initialState: LoginState = { status: "idle", message: "" };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    requestLoginLink,
    initialState,
  );

  if (state.status === "sent") {
    return (
      <p
        role="status"
        className="rounded-[4px] border border-[color:var(--ks-teal)]/40 bg-[color:var(--ks-teal)]/10 px-4 py-3 text-sm leading-relaxed text-[color:var(--ks-navy)]"
      >
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-4" noValidate>
      {state.status === "error" && (
        <p
          role="alert"
          className="rounded-[4px] border border-[color:var(--ks-red)]/40 bg-[color:var(--ks-red)]/10 px-4 py-3 text-sm leading-relaxed text-[color:var(--ks-red)]"
        >
          {state.message}
        </p>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-[color:var(--ks-navy)]"
        >
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1.5 w-full rounded-[3px] border border-[color:var(--ks-line)] bg-white px-3 py-2.5 text-sm text-[color:var(--ks-navy)] outline-none focus:border-[color:var(--ks-blue)]"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center bg-[color:var(--ks-blue)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--ks-navy)] disabled:opacity-60"
      >
        {pending ? "Sending…" : "Email me a sign-in link"}
      </button>
    </form>
  );
}
