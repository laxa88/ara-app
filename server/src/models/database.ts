// Reference:
// https://mherman.org/blog/postgresql-and-nodejs/

import pg from "pg";
import SQL from "sql-template-strings";
import config from "../../../config";
import { UserType } from "../definitions/user";

// Note: Run this to execute:
// ts-node src\models\database.ts

const createDb = async () => {
  const {
    host,
    port,
    database,
    user,
    password,
    superEmail,
    superFName,
    superLName,
    superPass,
    adminEmail,
    adminPass,
    adminFName,
    adminLName,
  } = config;

  const db = new pg.Client({
    database,
    host,
    password,
    port,
    user,
  });

  await db.connect();

  const errors: string[] = [];

  /***************************************************
    Houses

    Each house belongs to a street, and has two numbers:
    - The house number (publicly displayed)
    - The unit number (number used by real estate developer)
  ***************************************************/

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
    const result = await db.query(SQL`SELECT * FROM houses`);

    if (result.rowCount) {
      throw new Error("Houses already exists");
    }

    const houseCount = 182;
    const houseQueries = [];
    for (let i = 1; i <= houseCount; i += 1) {
      houseQueries.push(`('WP 2/x', ${i}, ${i})`);
    }

    await db.query(
      `
      INSERT INTO houses (road_number, house_number, unit_number)
      VALUES
        ${houseQueries.join(",")};
      `,
    );
  } catch (e) {
    errors.push(e.toString());
  }

  /***************************************************
    Users

    Every user should only be allowed to create a payment
    for themselves, and not anyone else. Each user should
    only belong to one house (unless they're rich enough
    to purchase more), in which case, they'll be forced
    to have one account for each house.
  ***************************************************/

  try {
    await db.query(
      SQL`
      CREATE TABLE users
      (
        id SERIAL PRIMARY KEY,
        house_id INTEGER REFERENCES houses(id),
        user_type TEXT NOT NULL,
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
  // set time zone
  // ==================================================

  try {
    await db.query(SQL`SET timezone = 'Asia/Kuala_Lumpur';`);
  } catch (e) {
    errors.push(e.toString());
  }

  /***************************************************
    Payments

    This is the core requirement of the app. Each user
    should be able to:
    - Make a new payment
    - Upload attachment image(s)
    - Describe the details (payment and remarks)
    - Check the state of approval by the committee
  ***************************************************/

  try {
    await db.query(
      SQL`
      CREATE TABLE payments
      (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        approver_id INTEGER REFERENCES users(id),
        date_created TIMESTAMP NOT NULL,
        amount INTEGER NOT NULL,
        remarks TEXT
      );
      `,
    );
  } catch (e) {
    errors.push(e.toString());
  }

  /***************************************************
    Payment Dates

    This table is separate from "payments" table, as it
    only keeps track of approved monthly payments by
    user. The admin will be responsible for tallying
    payments with actual months that each payment was for.

    Note: The "date" field is "TEXT" instead of "TIMESTAMP"
    because we only care for YYYY-MM formats.
  ***************************************************/

  try {
    await db.query(
      SQL`
      CREATE TABLE payment_dates
      (
        id SERIAL PRIMARY KEY,
        date TEXT NOT NULL,
        user_id INTEGER REFERENCES users(id),
        approver_id INTEGER REFERENCES users(id)
      );
      `,
    );
  } catch (e) {
    errors.push(e.toString());
  }

  /***************************************************
    Attachments

    At least one attachment (image) is required for each new
    payment as evidence. In most cases a payment should only
    have one proof of receipt, but just in case, we allow
    multiple attachments for one payment.
  ***************************************************/

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

  /***************************************************
    Close the database connection when we're done.
  ***************************************************/

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
