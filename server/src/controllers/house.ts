import Express from "express";
import pg from "pg";
import SQL from "sql-template-strings";
import conn from "../helpers/conn";

async function getHouses(req: Express.Request, res: Express.Response) {
  const logic = async (pc: pg.PoolClient) => {
    const result = await pc.query(SQL`SELECT * FROM houses ORDER BY id ASC`);
    res.status(200).json(result.rows);
  };

  await conn(logic);
}

export { getHouses };
