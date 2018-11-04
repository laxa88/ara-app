import Express from "express";
import pg from "pg";
import SQL from "sql-template-strings";
import conn from "../helpers/conn";

async function getUsers(req: Express.Request, res: Express.Response) {
  const logic = async (pc: pg.PoolClient) => {
    const result = await pc.query(SQL`SELECT * FROM users ORDER BY id ASC`);

    // Omit password field
    const data = result.rows.map((item) => {
      const { password, ...others } = item;
      return { ...others };
    });

    res.status(200).json(data);
  };

  await conn(logic);
}

export { getUsers };
