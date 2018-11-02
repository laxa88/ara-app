import Express from "express";
import pg from "pg";
import SQL from "sql-template-strings";
import config from "../../../config";
import builder from "../helpers/query-builder";

async function getUsers(req: Express.Request, res: Express.Response) {
  const { dbConn } = config;

  const db = new pg.Client(dbConn);
  await db.connect();

  const result = await db.query(
    builder(SQL`SELECT * FROM users ORDER BY id ASC`),
  );

  return res.status(200).json(result);
}

export { getUsers };
