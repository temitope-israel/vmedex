// No look-alike characters (0/O, 1/l/I), so a password read aloud or typed from a message is easy
const ALPHABET = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generatePassword(length = 12): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes); // the browser's secure random source
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
}