"use server";

import { Resend } from "resend";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { serverSecret } from "@/app/lib/convexServer";
import { getPackage } from "./packages";
import {
  EXPERIENCE_LABELS,
  PACKAGE_LABELS,
  SESSION_LABELS,
} from "./labels";

export type RegistrationState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<RegistrationField, string>>;
  /** Submitted values, echoed back on error so the form can stay filled. */
  values?: Partial<Record<RegistrationField, string>>;
};

export type RegistrationField =
  | "fullName"
  | "email"
  | "phone"
  | "city"
  | "background"
  | "businessIdea"
  | "experience"
  | "package"
  | "session";

const ALL_FIELDS: RegistrationField[] = [
  "fullName",
  "email",
  "phone",
  "city",
  "background",
  "businessIdea",
  "experience",
  "package",
  "session",
];

const REQUIRED_FIELDS: RegistrationField[] = [
  "fullName",
  "email",
  "phone",
  "city",
  "businessIdea",
  "experience",
  "package",
  "session",
];

const REQUIRED_MESSAGES: Record<RegistrationField, string> = {
  fullName: "Please enter your full name.",
  email: "Please enter your email address so we can reach you.",
  phone: "Please enter a phone number we can call you on.",
  city: "Please tell us which city you're based in.",
  background: "",
  businessIdea:
    "Please tell us a little about the business idea or industry that interests you.",
  experience: "Please select the option that best describes your experience.",
  package: "Please choose the training package you'd like to join.",
  session: "Please pick the session that works best for you.",
};

const FIELD_LABELS: Record<RegistrationField, string> = {
  fullName: "Full name",
  email: "Email",
  phone: "Phone",
  city: "City",
  background: "Professional background",
  businessIdea: "Business idea / interest",
  experience: "Entrepreneurial experience",
  package: "Training package",
  session: "Preferred session",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitRegistration(
  _prev: RegistrationState,
  formData: FormData,
): Promise<RegistrationState> {
  const values = Object.fromEntries(
    ALL_FIELDS.map((field) => [
      field,
      (formData.get(field) ?? "").toString().trim(),
    ]),
  ) as Record<RegistrationField, string>;

  // Honeypot: only a bot fills the visually hidden "website" input. Report
  // success so it has no signal to adapt to, but store nothing.
  if ((formData.get("website") ?? "").toString().trim() !== "") {
    return {
      status: "success",
      message:
        "Thank you — your registration has been received. Our team will review your application, confirm your payment status, and be in touch shortly.",
      values,
    };
  }

  const fieldErrors: Partial<Record<RegistrationField, string>> = {};

  for (const field of REQUIRED_FIELDS) {
    if (!values[field]) {
      fieldErrors[field] = REQUIRED_MESSAGES[field];
    }
  }

  if (values.email && !EMAIL_RE.test(values.email)) {
    fieldErrors.email =
      "That email address doesn't look right — please double-check it.";
  }

  if (values.phone && values.phone.replace(/\D/g, "").length < 9) {
    fieldErrors.phone =
      "That phone number looks too short — please double-check it.";
  }

  const errorCount = Object.keys(fieldErrors).length;
  if (errorCount > 0) {
    return {
      status: "error",
      message:
        errorCount === 1
          ? "Almost there — one field below needs your attention. Everything else you filled in has been kept."
          : `Almost there — ${errorCount} fields below need your attention. Everything else you filled in has been kept.`,
      fieldErrors,
      values,
    };
  }

  const escapeHtml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const firstName = values.fullName.split(/\s+/)[0];
  const sessionLabel = SESSION_LABELS[values.session] ?? values.session;
  const experienceLabel =
    EXPERIENCE_LABELS[values.experience] ?? values.experience;
  const chosenPackage = getPackage(values.package);
  const packageLabel = PACKAGE_LABELS[values.package] ?? values.package;

  const displayValues: Record<RegistrationField, string> = {
    ...values,
    experience: experienceLabel,
    package: packageLabel,
    session: sessionLabel,
  };

  const cellStyle =
    "padding:10px 14px;border-bottom:1px solid #e2e8f0;font-size:14px;line-height:1.5;";
  const internalRows = ALL_FIELDS.map((field) => {
    const raw = displayValues[field];
    let valueHtml = raw ? escapeHtml(raw) : '<span style="color:#94a3b8">—</span>';
    if (field === "email" && raw) {
      valueHtml = `<a href="mailto:${escapeHtml(raw)}" style="color:#1d4ed8">${escapeHtml(raw)}</a>`;
    }
    if (field === "phone" && raw) {
      valueHtml = `<a href="tel:${escapeHtml(raw.replace(/[^\d+]/g, ""))}" style="color:#1d4ed8">${escapeHtml(raw)}</a>`;
    }
    return `<tr>
      <td style="${cellStyle}background:#f8fafc;font-weight:600;color:#0f172a;width:190px;vertical-align:top;white-space:nowrap">${FIELD_LABELS[field]}</td>
      <td style="${cellStyle}color:#334155;vertical-align:top">${valueHtml}</td>
    </tr>`;
  }).join("");

  const internalHtml = `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto">
  <h2 style="margin:0 0 4px;font-size:20px;color:#0f172a">New training registration</h2>
  <p style="margin:0 0 20px;font-size:14px;color:#64748b">
    Building a Purpose-Driven Business &middot; submitted via bcadconsult.com.
    Reply to this email to reach the applicant directly.
  </p>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;border:1px solid #e2e8f0;border-radius:4px">
    ${internalRows}
  </table>
</div>`;

  const traineeHtml = `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;font-size:15px;line-height:1.6;color:#0f172a">
  <h2 style="margin:0 0 16px;font-size:20px">Thank you, ${escapeHtml(firstName)} — we've received your registration.</h2>
  <p style="margin:0 0 16px">
    You've applied for <strong>Building a Purpose-Driven Business</strong>,
    BCaD Consulting's intensive training for aspiring entrepreneurs,
    with a preference for the <strong>${escapeHtml(sessionLabel.toLowerCase())}</strong> session.
  </p>
  <p style="margin:0 0 16px">
    Your selected package: <strong>${escapeHtml(packageLabel)}</strong>.
  </p>
  <p style="margin:0 0 16px">
    Our team will review your application, confirm your payment status, and be
    in touch shortly.
  </p>
  <p style="margin:0 0 16px">
    Have a question in the meantime? Just reply to this email and we'll get
    back to you.
  </p>
  <p style="margin:0;color:#475569">— The BCaD Consulting team</p>
</div>`;

  // Save first, email second. Storing the registration is what actually
  // secures the applicant's place; the emails are notifications about it. If
  // Resend is down we must not lose the person, so only this step can fail the
  // submission.
  let registrationId: Id<"registrations">;
  try {
    const result = await fetchMutation(api.registrations.create, {
      secret: serverSecret(),
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      city: values.city,
      background: values.background || undefined,
      businessIdea: values.businessIdea,
      experience: values.experience,
      packageId: values.package,
      sessionPreference: values.session,
    });

    if (result.status === "rate_limited") {
      return {
        status: "error",
        message:
          "We've received several registrations from this address already. If that wasn't you, please email us at info@bcadconsult.com and we'll sort it out.",
        values,
      };
    }

    registrationId = result.id;
  } catch (error) {
    console.error("[BCaD registration] Convex write failed:", error);
    return {
      status: "error",
      message:
        "Sorry — we couldn't submit your registration just now. Your answers have been kept, so please try again in a moment. If it keeps failing, email us directly at info@bcadconsult.com.",
      values,
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const [internalResult, traineeResult] = await Promise.all([
      resend.emails.send({
        from: "BCaD Registrations <noreply@bcadconsult.com>",
        to: "info@bcadconsult.com",
        subject: `New registration: ${values.fullName}`,
        replyTo: values.email,
        html: internalHtml,
      }),
      resend.emails.send({
        from: "BCaD Consulting <noreply@bcadconsult.com>",
        to: values.email,
        subject: "We've received your registration — Building a Purpose-Driven Business",
        replyTo: "info@bcadconsult.com",
        html: traineeHtml,
      }),
    ]);

    if (internalResult.error) {
      // The team's copy failed, but the registration is safely stored and
      // will show up at /admin — so this is a logged warning, not a failure.
      console.error(
        "[BCaD registration] team notification failed:",
        internalResult.error,
      );
    }

    if (traineeResult.error) {
      console.error(
        "[BCaD registration] confirmation email failed:",
        traineeResult.error,
      );
    } else {
      await fetchMutation(api.registrations.markConfirmationEmailSent, {
        secret: serverSecret(),
        id: registrationId,
      });
    }
  } catch (error) {
    // Same reasoning: the applicant is registered even if nothing was emailed.
    console.error("[BCaD registration] Resend error:", error);
  }

  return {
    status: "success",
    message: `Thank you — your registration for the ${
      chosenPackage ? `${chosenPackage.title.toLowerCase()} (${chosenPackage.duration})` : "training"
    } has been received. Our team will review your application, confirm your payment status, and be in touch shortly.`,
    values,
  };
}
