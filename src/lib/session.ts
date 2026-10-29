import { cache } from "react";
import { cookies } from "next/headers";
import type { RowDataPacket } from "mysql2";
import { pool } from "@/lib/db";
import { COOKIE_NAME, SESSION_HOURS, signToken, verifyToken } from "@/lib/auth-token";
import type { AccountRole } from "@/lib/constants";

export type AdminSession = { adminId: number; email: string; role: AccountRole };

export async function createSession(adminId: number, email: string) {
  const token = await signToken(adminId, email);
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_HOURS * 60 * 60,
  });
}

// cache() means a page and its layout asking in the same request share one
// database lookup instead of making two.
export const getSession = cache(async (): Promise<AdminSession | null> => {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  const claims = token ? await verifyToken(token) : null;
  if (!claims || !Number.isInteger(claims.adminId)) return null;

  // The token proves the cookie is genuine. The database tells us whether the
  // account still exists and what its role is RIGHT NOW. So removing or
  // changing someone takes effect on their very next request.
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT id, email, role FROM admin_users WHERE id = ? LIMIT 1",
    [claims.adminId]
  );
  const user = rows[0];
  if (!user) return null;

  return { adminId: user.id, email: user.email, role: user.role };
});

export async function destroySession() {
  (await cookies()).delete(COOKIE_NAME);
}