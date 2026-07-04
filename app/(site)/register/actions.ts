"use server";

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

  console.log("[BCaD registration]", {
    receivedAt: new Date().toISOString(),
    ...values,
  });

  return {
    status: "success",
    message:
      "Thank you — your registration has been received. Our team will reach out shortly with payment and onboarding details.",
  };
}
