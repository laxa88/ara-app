// tslint:disable no-console

// Reference:
// https://mherman.org/blog/postgresql-and-nodejs/

import pg from "pg";
import SQL from "sql-template-strings";
import config from "../../../config";
import builder from "../helpers/query-builder";

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
  } = config;

  const errors: string[] = [];

  try {
    // const sql = loader("tbl_houses.sql");
    await db.query(
      `
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
      builder(SQL`SELECT * FROM houses WHERE hse_number = ${superHouseNum}`),
    );

    if (result.rows.length > 0) {
      throw new Error("SuperUser house already exists");
    }

    await db.query(
      builder(
        SQL`INSERT INTO houses (hse_number, unit_number)`,
        SQL`VALUES(${superHouseNum}, ${superUnitNum});`,
      ),
    );
  } catch (e) {
    errors.push(e.toString());
  }

  try {
    await db.query(
      `
      CREATE TABLE users
      (
        id SERIAL PRIMARY KEY,
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
      builder(SQL`SELECT * FROM users WHERE email = ${superEmail}`),
    );

    if (result.rows.length) {
      throw new Error("SuperUser account already exists");
    }

    await db.query(
      builder(
        SQL`INSERT INTO users(house_id, email, password, name)`,
        SQL`VALUES(1, ${superEmail}, crypt(${superPass}, gen_salt('bf')), ${superName});`,
      ),
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
