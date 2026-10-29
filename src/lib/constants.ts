// Values shared by server and browser code. Keep this file free of imports
// so either side can use it safely.
export const MAX_MODULES = 20;

// Flyer limits. The browser pre-checks them for friendliness; the server enforces them.
export const MAX_FLYER_BYTES = 3 * 1024 * 1024; // 3 MB
export const FLYER_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const MIN_PASSWORD_LENGTH = 8;
// bcrypt only reads the first 72 bytes, so longer passwords would be silently cut short
export const MAX_PASSWORD_BYTES = 72;

export const ACCOUNT_ROLES = ["admin", "editor"] as const;
export type AccountRole = (typeof ACCOUNT_ROLES)[number];