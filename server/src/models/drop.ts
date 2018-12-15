import pg from "pg";
import config from "../../../config";

// Note: Run this to execute:
// ts-node src\models\drop.ts

const deleteDb = async () => {
  const { host, port, database, user, password } = config;

  const db = new pg.Client({
    database,
    host,
    password,
    port,
    user,
  });

  await db.connect();

  const errors: string[] = [];
  const tables = [
    "houses",
    "users",
    "payments",
    "payment_dates",
    "attachments",
  ];

  for (const t of tables) {
    try {
      await db.query(`DROP TABLE ${t} CASCADE;`);
    } catch (e) {
      errors.push(e.toString());
    }
  }

  await db.end();

  return Promise.resolve(errors);
};

deleteDb()
  .then((success) => {
    console.log(success);
  })
  .catch((err) => {
    console.log("error:", err);
  });
