// Every image format begins with a fixed signature, called "magic bytes".
// Reading them tells us what the file really is, whatever its name or
// declared type says. A text file renamed to .png fails this check.
export function detectImageType(buf: Buffer): "image/jpeg" | "image/png" | "image/webp" | null {
  // JPEG starts FF D8 FF
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return "image/jpeg";
  }

  // PNG starts 89 50 4E 47 0D 0A 1A 0A
  const png = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (buf.length >= 8 && png.every((byte, i) => buf[i] === byte)) {
    return "image/png";
  }

  // WebP is "RIFF", then 4 size bytes, then "WEBP"
  if (
    buf.length >= 12 &&
    buf.toString("ascii", 0, 4) === "RIFF" &&
    buf.toString("ascii", 8, 12) === "WEBP"
  ) {
    return "image/webp";
  }

  return null; // anything else is refused
}