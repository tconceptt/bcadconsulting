"use server";

import { Resend } from "resend";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
};

type ContactField = "fullName" | "email" | "organization" | "topic" | "message";

const REQUIRED_FIELDS: ContactField[] = ["fullName", "email", "message"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const fields: ContactField[] = [
    "fullName",
    "email",
    "organization",
    "topic",
    "message",
  ];
  const values = Object.fromEntries(
    fields.map((field) => [field, (formData.get(field) ?? "").toString().trim()]),
  ) as Record<ContactField, string>;

  const fieldErrors: Partial<Record<ContactField, string>> = {};

  for (const field of REQUIRED_FIELDS) {
    if (!values[field]) {
      fieldErrors[field] = "This field is required.";
    }
  }

  if (values.email && !EMAIL_RE.test(values.email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const escapeHtml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const FIELD_LABELS: Record<ContactField, string> = {
    fullName: "Full name",
    email: "Email",
    organization: "Organization",
    topic: "Topic",
    message: "Message",
  };

  const cellStyle =
    "padding:10px 14px;border-bottom:1px solid #e2e8f0;font-size:14px;line-height:1.5;";
  const rows = fields
    .map((field) => {
      const raw = values[field];
      const valueHtml = raw
        ? escapeHtml(raw).replace(/\n/g, "<br>")
        : '<span style="color:#94a3b8">—</span>';
      return `<tr>
      <td style="${cellStyle}background:#f8fafc;font-weight:600;color:#0f172a;width:150px;vertical-align:top;white-space:nowrap">${FIELD_LABELS[field]}</td>
      <td style="${cellStyle}color:#334155;vertical-align:top">${valueHtml}</td>
    </tr>`;
    })
    .join("");

  const html = `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto">
  <h2 style="margin:0 0 4px;font-size:20px;color:#0f172a">New contact message</h2>
  <p style="margin:0 0 20px;font-size:14px;color:#64748b">
    Submitted via the bcadconsult.com contact form.
    Reply to this email to answer directly.
  </p>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;border:1px solid #e2e8f0;border-radius:4px">
    ${rows}
  </table>
</div>`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "BCaD Website <noreply@bcadconsult.com>",
      to: "info@bcadconsult.com",
      subject: `Contact form: ${values.fullName}${values.topic ? ` — ${values.topic}` : ""}`,
      replyTo: values.email,
      html,
    });
    if (error) throw error;
  } catch (error) {
    console.error("[BCaD contact] send failed:", error);
    return {
      status: "error",
      message:
        "Sorry — we couldn't send your message just now. Please try again in a moment, or email us directly at info@bcadconsult.com.",
    };
  }

  return {
    status: "success",
    message:
      "Thank you for reaching out. We read every message and will get back to you within two working days.",
  };
}
