import type { RowDataPacket } from "mysql2";
import { withLock } from "@/lib/db-lock";
import { MAX_MODULES } from "@/lib/constants";
import type { ModuleInput } from "@/lib/validation";

const CURRICULUM_LOCK = "vmedex_curriculum_write";

// New modules go to the end. Counting and inserting happen under the lock, so
// two admins adding at once can't both claim the same position or exceed the limit.
export async function createModule(
  input: ModuleInput
): Promise<"created" | "limit_reached"> {
  return withLock(CURRICULUM_LOCK, async (conn): Promise<"created" | "limit_reached"> => {
    const [rows] = await conn.query<RowDataPacket[]>(
      "SELECT COUNT(*) AS total, COALESCE(MAX(sort_order), 0) AS top FROM training_curriculum"
    );
    if (Number(rows[0].total) >= MAX_MODULES) return "limit_reached";

    await conn.query(
      "INSERT INTO training_curriculum (label, description, icon, sort_order) VALUES (?, ?, ?, ?)",
      [input.label, input.description, input.icon, Number(rows[0].top) + 1]
    );
    return "created";
  });
}

// Returns false if there is no module with that id
export async function updateModule(id: number, input: ModuleInput): Promise<boolean> {
  return withLock(CURRICULUM_LOCK, async (conn) => {
    const [found] = await conn.query<RowDataPacket[]>(
      "SELECT id FROM training_curriculum WHERE id = ? FOR UPDATE",
      [id]
    );
    if (found.length === 0) return false;

    await conn.query(
      "UPDATE training_curriculum SET label = ?, description = ?, icon = ? WHERE id = ?",
      [input.label, input.description, input.icon, id]
    );
    return true;
  });
}

export async function deleteModule(id: number): Promise<"deleted" | "not_found"> {
  return withLock(CURRICULUM_LOCK, async (conn): Promise<"deleted" | "not_found"> => {
    const [found] = await conn.query<RowDataPacket[]>(
      "SELECT id FROM training_curriculum WHERE id = ? FOR UPDATE",
      [id]
    );
    if (found.length === 0) return "not_found";

    await conn.query("DELETE FROM training_curriculum WHERE id = ?", [id]);
    return "deleted";
  });
}

// `ids` is the complete list in its new order. We only accept it if it matches
// exactly what is in the database right now. Otherwise the list was changed
// elsewhere, and saving would scramble it.
export async function reorderModules(ids: number[]): Promise<"ok" | "mismatch"> {
  return withLock(CURRICULUM_LOCK, async (conn): Promise<"ok" | "mismatch"> => {
    const [rows] = await conn.query<RowDataPacket[]>(
      "SELECT id FROM training_curriculum FOR UPDATE"
    );
    const current = new Set(rows.map((r) => Number(r.id)));
    if (current.size !== ids.length || ids.some((id) => !current.has(id))) {
      return "mismatch";
    }

    for (let i = 0; i < ids.length; i++) {
      await conn.query("UPDATE training_curriculum SET sort_order = ? WHERE id = ?", [
        i + 1,
        ids[i],
      ]);
    }
    return "ok";
  });
}