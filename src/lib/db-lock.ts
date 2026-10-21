import type { RowDataPacket } from "mysql2";
import type { PoolConnection } from "mysql2/promise";
import { pool } from "@/lib/db";

// Runs `work` inside a transaction while holding a named lock, so two admins
// can never change the same data at the same instant. A second request waits
// up to 5 seconds for its turn. Each editor passes its own lock name, so
// editing cohorts never blocks editing the curriculum.
export async function withLock<T>(
  lockName: string,
  work: (conn: PoolConnection) => Promise<T>
): Promise<T> {
  // A lock belongs to ONE connection, so we borrow one and use it throughout
  const conn = await pool.getConnection();
  try {
    const [lockRows] = await conn.query<RowDataPacket[]>(
      "SELECT GET_LOCK(?, 5) AS got",
      [lockName]
    );
    if (Number(lockRows[0].got) !== 1) throw new Error("LOCK_TIMEOUT");

    try {
      await conn.beginTransaction();
      const result = await work(conn);
      await conn.commit();
      return result;
    } catch (error) {
      await conn.rollback(); // undo every step if any one failed
      throw error;
    } finally {
      await conn.query("SELECT RELEASE_LOCK(?)", [lockName]);
    }
  } finally {
    conn.release(); // hand the connection back to the pool
  }
}