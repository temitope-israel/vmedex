import type { RowDataPacket, ResultSetHeader } from "mysql2";
import type { PoolConnection } from "mysql2/promise";
import { pool } from "@/lib/db";
import { withLock } from "@/lib/db-lock";
import { randomBytes } from "crypto";
import type { CohortInput } from "@/lib/validation";
const COHORT_LOCK = "vmedex_cohort_write";

export type AdminCohort = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  durationNote: string | null;
  location: string;
  locationNote: string | null;
  feeAmount: number;
  feeNote: string | null;
  certificationTitle: string | null;
  certificationNote: string | null;
  flyerPath: string | null;
  isActive: boolean;
};

function mapRow(r: RowDataPacket): AdminCohort {
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
    isActive: Boolean(r.is_active),
  };
}

export async function listCohorts(): Promise<AdminCohort[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM training_cohorts ORDER BY is_active DESC, start_date DESC"
  );
  return rows.map(mapRow);
}

export async function getCohortById(id: number): Promise<AdminCohort | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM training_cohorts WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0] ? mapRow(rows[0]) : null;
}


export async function createCohort(input: CohortInput): Promise<number> {
  return withLock(COHORT_LOCK,async (conn) => {
    if (input.isActive) {
      await conn.query("UPDATE training_cohorts SET is_active = 0 WHERE is_active = 1");
    }
    const [result] = await conn.query<ResultSetHeader>(
      `INSERT INTO training_cohorts
        (name, start_date, end_date, duration_note, location, location_note,
         fee_amount, fee_note, certification_title, certification_note, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        input.name,
        input.startDate,
        input.endDate,
        input.durationNote,
        input.location,
        input.locationNote,
        input.feeAmount,
        input.feeNote,
        input.certificationTitle,
        input.certificationNote,
        input.isActive ? 1 : 0,
      ]
    );
    return result.insertId;
  });
}

// Returns false if there is no cohort with that id
export async function updateCohort(id: number, input: CohortInput): Promise<boolean> {
  return withLock(COHORT_LOCK,async (conn) => {
    const [exists] = await conn.query<RowDataPacket[]>(
      "SELECT id FROM training_cohorts WHERE id = ? FOR UPDATE",
      [id]
    );
    if (exists.length === 0) return false;

    if (input.isActive) {
      await conn.query(
        "UPDATE training_cohorts SET is_active = 0 WHERE is_active = 1 AND id <> ?",
        [id]
      );
    }
    await conn.query(
      `UPDATE training_cohorts SET
         name = ?, start_date = ?, end_date = ?, duration_note = ?,
         location = ?, location_note = ?, fee_amount = ?, fee_note = ?,
         certification_title = ?, certification_note = ?, is_active = ?
       WHERE id = ?`,
      [
        input.name,
        input.startDate,
        input.endDate,
        input.durationNote,
        input.location,
        input.locationNote,
        input.feeAmount,
        input.feeNote,
        input.certificationTitle,
        input.certificationNote,
        input.isActive ? 1 : 0,
        id,
      ]
    );
    return true;
  });
}

export async function deleteCohort(
  id: number
): Promise<"deleted" | "not_found" | "is_active"> {
  return withLock(COHORT_LOCK,async (conn): Promise<"deleted" | "not_found" | "is_active"> => {
    const [rows] = await conn.query<RowDataPacket[]>(
      "SELECT is_active FROM training_cohorts WHERE id = ? FOR UPDATE",
      [id]
    );
    if (rows.length === 0) return "not_found";
    if (rows[0].is_active === 1) return "is_active"; // never delete what visitors can see

    await conn.query("DELETE FROM training_cohorts WHERE id = ?", [id]);
    return "deleted";
  });
}

// Saves (or replaces) a cohort's flyer. Returns the new public token,
// or null if the cohort doesn't exist.
export async function setCohortFlyer(
  id: number,
  data: Buffer,
  mime: string
): Promise<string | null> {
  return withLock(COHORT_LOCK, async (conn) => {
    const [found] = await conn.query<RowDataPacket[]>(
      "SELECT id FROM training_cohorts WHERE id = ? FOR UPDATE",
      [id]
    );
    if (found.length === 0) return null;

    // "Upsert": insert, or if this cohort already has a flyer, replace it.
    // execute() sends the image as raw bytes instead of a giant text literal.
    await conn.execute(
      `INSERT INTO cohort_flyers (cohort_id, mime_type, data) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE mime_type = VALUES(mime_type), data = VALUES(data)`,
      [id, mime, data]
    );

    // A fresh random token per upload. A new token means a new URL, so browsers
    // never show an old cached image after a replacement.
    const token = `${id}-${Date.now()}-${randomBytes(4).toString("hex")}`;
    await conn.query("UPDATE training_cohorts SET flyer_path = ? WHERE id = ?", [token, id]);
    return token;
  });
}

// Returns false if the cohort doesn't exist
export async function removeCohortFlyer(id: number): Promise<boolean> {
  return withLock(COHORT_LOCK, async (conn) => {
    const [found] = await conn.query<RowDataPacket[]>(
      "SELECT id FROM training_cohorts WHERE id = ? FOR UPDATE",
      [id]
    );
    if (found.length === 0) return false;

    await conn.query("DELETE FROM cohort_flyers WHERE cohort_id = ?", [id]);
    await conn.query("UPDATE training_cohorts SET flyer_path = NULL WHERE id = ?", [id]);
    return true;
  });
}