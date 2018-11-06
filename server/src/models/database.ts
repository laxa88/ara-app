// Reference:
// https://mherman.org/blog/postgresql-and-nodejs/

import pg from "pg";
import SQL from "sql-template-strings";
import config from "../../../config";
import { UserType } from "./user";

// Note: Run this to execute:
// ts-node src\models\database.ts

const createDb = async () => {
  const { dbConn } = config;

  const db = new pg.Client(dbConn);
  await db.connect();

  const {
    superEmail,
    superFName,
    superLName,
    superPass,
    superRoadNum,
    superHouseNum,
    superUnitNum,
    adminEmail,
    adminPass,
    adminFName,
    adminLName,
  } = config;

  const errors: string[] = [];

  // ==================================================
  // houses
  // ==================================================

  try {
    await db.query(
      SQL`
      CREATE TABLE houses
      (
        id SERIAL PRIMARY KEY,
        road_number VARCHAR NOT NULL,
        house_number INTEGER NOT NULL,
        unit_number INTEGER NOT NULL UNIQUE
      );
      `,
    );
  } catch (e) {
    errors.push(e.toString());
  }

  try {
    const result = await db.query(
      SQL`SELECT * FROM houses WHERE house_number = ${superHouseNum}`,
    );

    if (result.rows.length > 0) {
      throw new Error("Houses already exists");
    }

    await db.query(
      SQL`
      INSERT INTO houses (road_number, house_number, unit_number)
      VALUES(${superRoadNum}, ${superHouseNum}, ${superUnitNum});
      `,
    );
  } catch (e) {
    errors.push(e.toString());
  }

  // ==================================================
  // users
  // ==================================================

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
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL
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

    // prettier-ignore
    await db.query(
      SQL`
      INSERT INTO users(user_type, house_id, email, password, first_name, last_name)
      VALUES
        (${UserType.SUPER}, 1, ${superEmail}, crypt(${superPass}, gen_salt('bf')), ${superFName}, ${superLName}),
        (${UserType.ADMIN}, 1, ${adminEmail}, crypt(${adminPass}, gen_salt('bf')), ${adminFName}, ${adminLName});
      `,
    );
  } catch (e) {
    errors.push(e.toString());
  }

  // ==================================================
  // payments
  // ==================================================

  try {
    await db.query(SQL`	SET timezone = 'Asia/Kuala_Lumpur';`);
  } catch (e) {
    errors.push(e.toString());
  }

  try {
    await db.query(
      SQL`
      CREATE TABLE payments
      (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        date_created TIMESTAMP NOT NULL,
        date_paid TIMESTAMP NOT NULL,
        date_approved TIMESTAMP NOT NULL
      );
      `,
    );
  } catch (e) {
    errors.push(e.toString());
  }

  // ==================================================
  // attachments
  // ==================================================

  try {
    await db.query(
      SQL`
      CREATE TABLE attachments
      (
        id SERIAL PRIMARY KEY,
        payment_id INTEGER REFERENCES payments(id),
        file_name TEXT NOT NULL
      );
      `,
    );
  } catch (e) {
    errors.push(e.toString());
  }

  // ==================================================
  // end
  // ==================================================

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
