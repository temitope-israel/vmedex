import mysql from "mysql2/promise";

// In development, Next.js hot-reloads modules on every save, which would
// create a brand-new pool each time and quickly exhaust the database's
// connection limit. Caching the pool on globalThis survives reloads.
const globalForDb = globalThis as unknown as { pool?: mysql.Pool };

export const pool =
  globalForDb.pool ??
  mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 5,
    dateStrings: ['DATE'], // return "2026-10-19", not Date object
  });

if (process.env.NODE_ENV !== "production") globalForDb.pool = pool;