import type { RowDataPacket } from "mysql2";
import { pool } from "@/lib/db";

export type Cohort = {
  id: number;
  name: string;
  startDate: string; // "2026-10-19"
  endDate: string;
  durationNote: string | null;
  location: string;
  locationNote: string | null;
  feeAmount: number;
  feeNote: string | null;
  certificationTitle: string | null;
  certificationNote: string | null;
  flyerPath: string | null;
};

export type CurriculumItem = {
  id: number;
  label: string;
  description: string;
  icon: string;
};

// The one cohort currently marked active, or null if none is
export async function getActiveCohort(): Promise<Cohort | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM training_cohorts WHERE is_active = 1 ORDER BY start_date DESC LIMIT 1"
  );
  const r = rows[0];
  if (!r) return null;

  // Map the database's snake_case columns to the camelCase our code uses
  return {
    id: r.id,
    name: r.name,
    startDate: r.start_date,
    endDate: r.end_date,
    durationNote: r.duration_note,
    location: r.location,
    locationNote: r.location_note,
    feeAmount: r.fee_amount,
    feeNote: r.fee_note,
    certificationTitle: r.certification_title,
    certificationNote: r.certification_note,
    flyerPath: r.flyer_path,
  };
}

export async function getCurriculum(): Promise<CurriculumItem[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT id, label, description, icon FROM training_curriculum ORDER BY sort_order"
  );
  return rows.map((r) => ({
    id: r.id,
    label: r.label,
    description: r.description,
    icon: r.icon,
  }));
}