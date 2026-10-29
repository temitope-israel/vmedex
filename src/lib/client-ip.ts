import type { NextRequest } from "next/server";

// A server sitting in front of the app (Apache on cPanel, Vercel's edge) records
// the caller's address in the X-Forwarded-For header. We take the LAST entry,
// the one added by our own trusted proxy. Earlier entries can be faked by the caller.
export function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length > 0) return parts[parts.length - 1];
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}