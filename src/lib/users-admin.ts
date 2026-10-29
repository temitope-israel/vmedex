import bcrypt from "bcryptjs";
import type { RowDataPacket } from "mysql2";
import { pool } from "@/lib/db";
import { withLock } from "@/lib/db-lock";
import type { AccountInput } from "@/lib/validation";
import type { AccountRole } from "@/lib/constants";

const USERS_LOCK = "vmedex_users_write";

export type AdminUser = { id: number; email: string; role: AccountRole };

export async function listUsers(): Promise<AdminUser[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT id, email, role FROM admin_users ORDER BY role ASC, email ASC"
  );
  return rows.map((r) => ({ id: r.id, email: r.email, role: r.role }));
}

export async function createUser(input: AccountInput): Promise<"created" | "duplicate"> {
  const hash = await bcrypt.hash(input.password, 12);
  try {
    await pool.query(
      "INSERT INTO admin_users (email, password_hash, role) VALUES (?, ?, ?)",
      [input.email, hash, input.role]
    );
    return "created";
  } catch (error) {
    // The UNIQUE rule on email does the real work, so two simultaneous
    // requests can never both succeed
    if ((error as { code?: string })?.code === "ER_DUP_ENTRY") return "duplicate";
    throw error;
  }
}

// The count and the delete happen under one lock, so two admins removing each
// other at the same moment can't leave the system with no admin at all.
export async function deleteUser(id: number): Promise<"deleted" | "not_found" | "last_admin"> {
  return withLock(USERS_LOCK, async (conn): Promise<"deleted" | "not_found" | "last_admin"> => {
    const [rows] = await conn.query<RowDataPacket[]>(
      "SELECT id, role FROM admin_users FOR UPDATE"
    );
    const target = rows.find((r) => r.id === id);
    if (!target) return "not_found";

    const adminCount = rows.filter((r) => r.role === "admin").length;
    if (target.role === "admin" && adminCount <= 1) return "last_admin";

    await conn.query("DELETE FROM admin_users WHERE id = ?", [id]);
    return "deleted";
  });
}