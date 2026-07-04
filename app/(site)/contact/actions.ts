"use server";

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

  console.log("[BCaD contact]", {
    receivedAt: new Date().toISOString(),
    ...values,
  });

  return {
    status: "success",
    message:
      "Thank you for reaching out. We read every message and will get back to you within two working days.",
  };
}
