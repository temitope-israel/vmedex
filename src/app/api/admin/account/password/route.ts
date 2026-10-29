import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import type { RowDataPacket } from "mysql2";
import { pool } from "@/lib/db";
import { getSession } from "@/lib/session";
import { checkNewPassword } from "@/lib/validation";
import { checkLimit, recordEvent, clearEvents, rateLimitedResponse } from "@/lib/rate-limit";
import { apiError } from "@/lib/api-errors";

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "You're not signed in." }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => null);
    const current = body?.currentPassword;
    const next = body?.newPassword;

    if (typeof current !== "string" || !current) {
      return NextResponse.json({ error: "Enter your current password." }, { status: 400 });
    }
    const problem = checkNewPassword(next);
    if (problem) return NextResponse.json({ error: problem }, { status: 400 });
    if (next === current) {
      return NextResponse.json(
        { error: "Your new password must be different from the current one." },
        { status: 400 }
      );
    }

    // Wrong "current password" guesses are limited too, in case someone has
    // borrowed a signed-in browser
    const bucket = `pwchange:${session.adminId}`;
    const limit = await checkLimit(bucket, 5, 15 * 60);
    if (!limit.allowed) return rateLimitedResponse(limit.retryAfterSeconds);

    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT password_hash FROM admin_users WHERE id = ? LIMIT 1",
      [session.adminId]
    );
    const hash = rows[0]?.password_hash;
    if (!hash) {
      return NextResponse.json({ error: "You're not signed in." }, { status: 401 });
    }

    if (!(await bcrypt.compare(current, hash))) {
      await recordEvent(bucket);
      return NextResponse.json({ error: "Your current password is incorrect." }, { status: 400 });
    }

    const newHash = await bcrypt.hash(next as string, 12);
    await pool.query("UPDATE admin_users SET password_hash = ? WHERE id = ?", [
      newHash,
      session.adminId,
    ]);
    await clearEvents(bucket);

    return NextResponse.json({ success: true });
  } catch (error) {
    return apiError(error, "Change password");
  }
}