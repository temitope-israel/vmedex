import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import type { RowDataPacket } from "mysql2";
import { pool } from "@/lib/db";
import { createSession } from "@/lib/session";
import { apiError } from "@/lib/api-errors";

// Compared against when the email doesn't exist, so both paths take equal time
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 12);

// Error codes meaning "the database couldn't be reached, or refused us"
// const DB_UNAVAILABLE = [
//   "ECONNREFUSED",
//   "ETIMEDOUT",
//   "ENOTFOUND",
//   "EAI_AGAIN",
//   "PROTOCOL_CONNECTION_LOST",
//   "ER_ACCESS_DENIED_ERROR",
// ];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const email = body?.email;
    const password = body?.password;

    if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id, email, password_hash FROM admin_users WHERE email = ? LIMIT 1",
      [email.trim().toLowerCase()]
    );
    const admin = rows[0];

    const valid = await bcrypt.compare(password, admin?.password_hash ?? DUMMY_HASH);

    if (!admin || !valid) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    await createSession(admin.id, admin.email);
    return NextResponse.json({ success: true });
  } catch (error) {
    return apiError(error, "Login")
    // Log the real reason for us; show the visitor something friendly
  //   console.error("Login failed unexpectedly:", error);

  //   const code = (error as { code?: string })?.code;
  //   if (code && DB_UNAVAILABLE.includes(code)) {
  //     return NextResponse.json(
  //       { error: "We can't reach our service right now. Please try again in a few minutes." },
  //       { status: 503 }
  //     );
  //   }
  //   return NextResponse.json(
  //     { error: "Something went wrong on our side. Please try again OR Check if you're connected to the internet." },
  //     { status: 500 }
  //   );
  //
  }
}