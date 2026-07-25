"use server";

import { Resend } from "resend";
import { getPackage, TRAINING_PACKAGES } from "./packages";

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

const PACKAGE_LABELS: Record<string, string> = Object.fromEntries(
  TRAINING_PACKAGES.map((p) => [p.id, `${p.title} (${p.duration}) — ${p.price}`]),
);

const EXPERIENCE_LABELS: Record<string, string> = {
  "just-an-idea": "Just an idea — exploring",
  "early-stage": "Early-stage / pre-revenue",
  running: "Running a business already",
  returning: "Returning / pivoting",
};

const SESSION_LABELS: Record<string, string> = {
  morning: "Morning (8:30 – 12:00)",
  afternoon: "Afternoon (1:30 – 5:00 pm)",
  evening: "Evening (6:00 – 8:00 pm)",
  flexible: "Flexible — happy with any session",
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

  const resend = new Resend(process.env.RESEND_API_KEY);

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
    console.error("[BCaD registration] Resend error:", internalResult.error);
    return {
      status: "error",
      message:
        "Sorry — we couldn't submit your registration just now. Your answers have been kept, so please try again in a moment. If it keeps failing, email us directly at info@bcadconsult.com.",
      values,
    };
  }

  if (traineeResult.error) {
    // Registration reached the team; only the confirmation copy failed.
    console.error(
      "[BCaD registration] confirmation email failed:",
      traineeResult.error,
    );
  }

  return {
    status: "success",
    message: `Thank you — your registration for the ${
      chosenPackage ? `${chosenPackage.title.toLowerCase()} (${chosenPackage.duration})` : "training"
    } has been received. Our team will review your application, confirm your payment status, and be in touch shortly.`,
    values,
  };
}
