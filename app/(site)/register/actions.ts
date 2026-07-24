"use server";

import { Resend } from "resend";

export type RegistrationState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<RegistrationField, string>>;
};

type RegistrationField =
  | "fullName"
  | "email"
  | "phone"
  | "city"
  | "background"
  | "businessIdea"
  | "experience"
  | "session";

const REQUIRED_FIELDS: RegistrationField[] = [
  "fullName",
  "email",
  "phone",
  "city",
  "businessIdea",
  "experience",
  "session",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitRegistration(
  _prev: RegistrationState,
  formData: FormData,
): Promise<RegistrationState> {
  const values = Object.fromEntries(
    REQUIRED_FIELDS.concat(["background"]).map((field) => [
      field,
      (formData.get(field) ?? "").toString().trim(),
    ]),
  ) as Record<RegistrationField, string>;

  const fieldErrors: Partial<Record<RegistrationField, string>> = {};

  for (const field of REQUIRED_FIELDS) {
    if (!values[field]) {
      fieldErrors[field] = "This field is required.";
    }
  }

  if (values.email && !EMAIL_RE.test(values.email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (values.phone && values.phone.replace(/\D/g, "").length < 9) {
    fieldErrors.phone = "Enter a valid phone number.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const escapeHtml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const detailRows = REQUIRED_FIELDS.concat(["background"])
    .map(
      (field) =>
        `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;vertical-align:top">${field}</td><td style="padding:4px 0">${escapeHtml(values[field] || "—")}</td></tr>`,
    )
    .join("");

  const firstName = values.fullName.split(/\s+/)[0];

  const [internalResult, traineeResult] = await Promise.all([
    resend.emails.send({
      from: "BCaD Registrations <noreply@bcadconsult.com>",
      to: "info@bcadconsult.com",
      subject: `New registration: ${values.fullName}`,
      replyTo: values.email,
      html: `<h2>New training registration</h2>
<p>A new trainee has registered for Building a Purpose-Driven Business. Details below — reply to this email to reach them directly.</p>
<table>${detailRows}</table>`,
    }),
    resend.emails.send({
      from: "BCaD Consulting <noreply@bcadconsult.com>",
      to: values.email,
      subject: "Your registration is confirmed — Building a Purpose-Driven Business",
      replyTo: "info@bcadconsult.com",
      html: `<h2>Welcome aboard, ${escapeHtml(firstName)}!</h2>
<p>Thank you for registering for <strong>Building a Purpose-Driven Business</strong>, BCaD Consulting's 4-week intensive training for aspiring entrepreneurs.</p>
<p><strong>What you signed up for:</strong></p>
<ul>
  <li>Starts July 6 — 4 weeks, intensive</li>
  <li>Preferred session: ${escapeHtml(values.session)}</li>
  <li>Includes coaching, a peer group, and a certificate</li>
</ul>
<p><strong>What happens next:</strong> our team will reach out shortly with payment details (the training fee is 20,000 ETB) and everything you need to get started.</p>
<p>Have a question in the meantime? Just reply to this email and we'll get back to you.</p>
<p>— The BCaD Consulting team</p>`,
    }),
  ]);

  if (internalResult.error) {
    console.error("[BCaD registration] Resend error:", internalResult.error);
    return {
      status: "error",
      message:
        "Something went wrong submitting your registration. Please try again or contact us directly.",
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
    message:
      "Thank you — your registration has been received. Our team will reach out shortly with payment and onboarding details.",
  };
}
