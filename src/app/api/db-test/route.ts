import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const [cohorts] = await pool.query("SELECT COUNT(*) AS n FROM training_cohorts");
    const [modules] = await pool.query("SELECT COUNT(*) AS n FROM training_curriculum");
    return NextResponse.json({ cohorts, modules });
  } catch (error) {
    console.error("DB test failed:", error);
    return NextResponse.json({ error: "DB connection failed" }, { status: 500 });
  }
}