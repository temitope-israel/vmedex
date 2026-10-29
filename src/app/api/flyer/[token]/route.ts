import { NextRequest, NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import { pool } from "@/lib/db";

// Tokens look like 3-1760000000000-9f2c41ab. Anything else is rejected
// before it ever reaches the database.
const TOKEN_PATTERN = /^\d+-\d+-[a-f0-9]{8}$/;

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ token: string }> }
) {
  const { token } = await context.params;
  if (!TOKEN_PATTERN.test(token)) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT f.mime_type, f.data
         FROM training_cohorts c
         JOIN cohort_flyers f ON f.cohort_id = c.id
        WHERE c.flyer_path = ?
        LIMIT 1`,
      [token]
    );
    const row = rows[0];
    if (!row) return new NextResponse("Not found", { status: 404 });

    const data: Buffer = row.data; // mysql2 returns BLOB columns as Buffers

    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": row.mime_type,
        "Content-Length": String(data.length),
        // The token changes on every upload, so this exact URL can never show
        // different content. That makes it safe to cache for a year.
        "Cache-Control": "public, max-age=31536000, immutable",
        // Tell browsers to obey our Content-Type and never guess
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Flyer failed to load:", error);
    return new NextResponse("Temporarily unavailable", { status: 503 });
  }
}