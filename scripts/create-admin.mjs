import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

const [email, password, role = "admin"] = process.argv.slice(2);

if (!email || !password || password.length < 8 || !["admin", "editor"].includes(role)) {
  console.error(
    "Usage: node --env-file=.env.local scripts/create-admin.mjs <email> <password, 8+ chars> [admin|editor]"
  );
  process.exit(1);
}

const connection = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const hash = await bcrypt.hash(password, 12);

await connection.execute(
  "INSERT INTO admin_users (email, password_hash, role) VALUES (?, ?, ?)",
  [email.trim().toLowerCase(), hash, role]
);

console.log(`Created ${role}:`, email);
await connection.end();


// import mysql from "mysql2/promise";
// import bcrypt from 'bcryptjs';

// const [email, password] = process.argv.slice(2);

// if(!email || !password || password.length < 10) {
//     console.error(
//         "Usage: node --env-file=.env.local scripts/create-admin.mjs <email> <password, 10+ chars>"
//     )
//     process.exit(1);
// }

// const connection = await mysql.createConnection({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
// })

// // Cost factor 12 = 2^12 hashing rounds: deliberately slow, so guessing passwords is expensive
// const hash = await bcrypt.hash(password, 12);

// await connection.execute(
//     "INSERT INTO admin_users (email, password_hash) VALUES (?, ?)",
//     [email.trim().toLowerCase(), hash]
// )

// console.log("Admin created:", email);
// await connection.end();