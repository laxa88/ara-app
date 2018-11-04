// Reference:
// https://mherman.org/blog/postgresql-and-nodejs/

import pg from "pg";
import SQL from "sql-template-strings";
import config from "../../../config";

// Note: Run this to execute:
// ts-node src\models\database.ts

const createDb = async () => {
  const { dbConn } = config;

  const db = new pg.Client(dbConn);
  await db.connect();

  const {
    superEmail,
    superName,
    superPass,
    superHouseNum,
    superUnitNum,
    adminEmail,
    adminPass,
    adminName,
  } = config;

  const errors: string[] = [];

  try {
    // const sql = loader("tbl_houses.sql");
    await db.query(
      SQL`
      CREATE TABLE houses
      (
        id SERIAL PRIMARY KEY,
        hse_number INTEGER NOT NULL UNIQUE,
        unit_number INTEGER NOT NULL UNIQUE
      );
      `,
    );
  } catch (e) {
    errors.push(e.toString());
  }

  try {
    const result = await db.query(
      SQL`SELECT * FROM houses WHERE hse_number = ${superHouseNum}`,
    );

    if (result.rows.length > 0) {
      throw new Error("Houses already exists");
    }

    await db.query(
      SQL`
      INSERT INTO houses (hse_number, unit_number)
      VALUES(${superHouseNum}, ${superUnitNum});
      `,
    );
  } catch (e) {
    errors.push(e.toString());
  }

  try {
    await db.query(
      SQL`
      CREATE TABLE users
      (
        id SERIAL PRIMARY KEY,
        user_type TEXT NOT NULL,
        house_id INTEGER REFERENCES houses(id),
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        name TEXT NOT NULL
      );
      `,
    );
  } catch (e) {
    errors.push(e.toString());
  }

  // Reference:
  // https://x-team.com/blog/storing-secure-passwords-with-postgresql/

  try {
    await db.query(SQL`CREATE EXTENSION pgcrypto;`);
  } catch (e) {
    errors.push(e.toString());
  }

  try {
    const result = await db.query(
      SQL`SELECT * FROM users WHERE email = ${superEmail}`,
    );

    if (result.rows.length) {
      throw new Error("Accounts already exists");
    }

    await db.query(
      SQL`
      INSERT INTO users(user_type, house_id, email, password, name)
      VALUES
        ('SUPER', 1, ${superEmail}, crypt(${superPass}, gen_salt('bf')), ${superName}),
        ('ADMIN', 1, ${adminEmail}, crypt(${adminPass}, gen_salt('bf')), ${adminName});
      `,
    );
  } catch (e) {
    errors.push(e.toString());
  }

  await db.end();

  return Promise.resolve(errors);
};

createDb()
  .then((success) => {
    console.log(success);
  })
  .catch((err) => {
    console.log("error:", err);
  });
