import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import { pool } from "@/lib/db";

export type LimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

// Counts events in `bucket` during the last `windowSeconds` seconds.
// Blocked once the count has reached `max`.
export async function checkLimit(
  bucket: string,
  max: number,
  windowSeconds: number
): Promise<LimitResult> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT COUNT(*) AS n,
            TIMESTAMPDIFF(SECOND, MIN(created_at), NOW()) AS age
       FROM rate_limit_events
      WHERE bucket = ? AND created_at > NOW() - INTERVAL ? SECOND`,
    [bucket, windowSeconds]
  );
  if (Number(rows[0].n) < max) return { allowed: true };

  // The window frees up when the OLDEST counted event ages out of it
  const age = Number(rows[0].age ?? 0);
  return { allowed: false, retryAfterSeconds: Math.max(1, windowSeconds - age) };
}

export async function recordEvent(bucket: string) {
  await pool.query("INSERT INTO rate_limit_events (bucket) VALUES (?)", [bucket]);
}

export async function clearEvents(bucket: string) {
  await pool.query("DELETE FROM rate_limit_events WHERE bucket = ?", [bucket]);
}

// Housekeeping so the table can't grow forever
export async function purgeOldEvents() {
  await pool.query("DELETE FROM rate_limit_events WHERE created_at < NOW() - INTERVAL 1 DAY");
}

// The standard reply: status 429 plus a Retry-After header
export function rateLimitedResponse(retryAfterSeconds: number) {
  const minutes = Math.ceil(retryAfterSeconds / 60);
  return NextResponse.json(
    {
      error: `Too many attempts. Please try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`,
    },
    { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
  );
}