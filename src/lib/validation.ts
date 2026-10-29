import { ICON_KEYS } from "@/lib/icons";
import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_BYTES, ACCOUNT_ROLES, type AccountRole } from "./constants";

export type CohortInput = {
  name: string;
  startDate: string;
  endDate: string;
  durationNote: string | null;
  location: string;
  locationNote: string | null;
  feeAmount: number;
  feeNote: string | null;
  certificationTitle: string | null;
  certificationNote: string | null;
  isActive: boolean;
};

export type ParseResult =
  | { ok: true; data: CohortInput }
  | { ok: false; error: string };

const fail = (error: string): ParseResult => ({ ok: false, error });
const clean = (value: unknown) => (typeof value === "string" ? value.trim() : "");

// Optional text: empty becomes null, and anything too long is cut to fit the column
const optional = (value: unknown, max: number) => {
  const text = clean(value);
  return text === "" ? null : text.slice(0, max);
};

// A real calendar date in YYYY-MM-DD form. The round trip catches "2026-02-31".
function isRealDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

export function parseCohortInput(body: unknown): ParseResult {
  if (typeof body !== "object" || body === null) return fail("Invalid request.");
  const b = body as Record<string, unknown>;

  const name = clean(b.name);
  const location = clean(b.location);
  const startDate = clean(b.startDate);
  const endDate = clean(b.endDate);

  if (!name) return fail("Cohort name is required.");
  if (name.length > 255) return fail("Cohort name is too long.");
  if (!location) return fail("Location is required.");
  if (location.length > 255) return fail("Location is too long.");
  if (!isRealDate(startDate)) return fail("Start date is not a valid date.");
  if (!isRealDate(endDate)) return fail("End date is not a valid date.");
  if (endDate < startDate) return fail("The end date can't be before the start date.");

  const feeText = String(b.feeAmount ?? "").trim();
  if (feeText === "") return fail("Tuition fee is required.");
  const feeAmount = Number(feeText);
  if (!Number.isInteger(feeAmount) || feeAmount < 0 || feeAmount > 100_000_000) {
    return fail("Tuition fee must be a whole number of naira, 0 or more.");
  }

  return {
    ok: true,
    data: {
      name,
      startDate,
      endDate,
      durationNote: optional(b.durationNote, 100),
      location,
      locationNote: optional(b.locationNote, 255),
      feeAmount,
      feeNote: optional(b.feeNote, 255),
      certificationTitle: optional(b.certificationTitle, 100),
      certificationNote: optional(b.certificationNote, 255),
      isActive: b.isActive === true,
    },
  };
}

export type ModuleInput = { label: string; description: string; icon: string };

export type ModuleParseResult =
  | { ok: true; data: ModuleInput }
  | { ok: false; error: string };

export function parseModuleInput(body: unknown): ModuleParseResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Invalid request." };
  }
  const b = body as Record<string, unknown>;

  const label = clean(b.label);
  const description = clean(b.description);
  const icon = clean(b.icon);

  if (!label) return { ok: false, error: "Module name is required." };
  if (label.length > 100) {
    return { ok: false, error: "Module name is too long (100 characters at most)." };
  }
  if (!description) return { ok: false, error: "Description is required." };
  if (description.length > 500) {
    return { ok: false, error: "Description is too long (500 characters at most)." };
  }
  // An allow-list: the icon must be one we actually know how to draw
  if (!ICON_KEYS.includes(icon)) {
    return { ok: false, error: "Please choose an icon from the list." };
  }

  return { ok: true, data: { label, description, icon } };
}

export type OrderParseResult =
  | { ok: true; ids: number[] }
  | { ok: false; error: string };

// The new order arrives as a list of module ids: { ids: [3, 1, 2] }
export function parseOrder(body: unknown): OrderParseResult {
  const raw = (body as { ids?: unknown } | null)?.ids;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 50) {
    return { ok: false, error: "Invalid order." };
  }

  const ids = raw.map(Number);
  const allValid = ids.every((n) => Number.isInteger(n) && n > 0);
  // No duplicates either: [1, 1, 2] must never pass as a "complete" list
  if (!allValid || new Set(ids).size !== ids.length) {
    return { ok: false, error: "Invalid order." };
  }
  return { ok: true, ids };
}

// Returns a message if the password is unacceptable, or null if it's fine
export function checkNewPassword(password: unknown): string | null {
  if (typeof password !== "string") return "Password is required.";
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }
  if (Buffer.byteLength(password, "utf8") > MAX_PASSWORD_BYTES) {
    return "That password is too long. Please use fewer characters.";
  }
  return null;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type AccountInput = { email: string; role: AccountRole; password: string };

export type AccountParseResult =
  | { ok: true; data: AccountInput }
  | { ok: false; error: string };

export function parseAccountInput(body: unknown): AccountParseResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Invalid request." };
  }
  const b = body as Record<string, unknown>;

  const email = clean(b.email).toLowerCase();
  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }
  if (!ACCOUNT_ROLES.includes(b.role as AccountRole)) {
    return { ok: false, error: "Choose a role." };
  }
  const passwordError = checkNewPassword(b.password);
  if (passwordError) return { ok: false, error: passwordError };

  return {
    ok: true,
    data: { email, role: b.role as AccountRole, password: b.password as string },
  };
}