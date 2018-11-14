import Express from "express";
import jwt from "jsonwebtoken";
import pg from "pg";
import SQL from "sql-template-strings";
import config from "../../../config";
import conn from "../helpers/conn";
import { signToken } from "../helpers/token";

async function login(req: Express.Request, res: Express.Response) {
  const { email, password } = req.body;

  const logic = async (pc: pg.PoolClient) => {
    const result = await pc.query(
      SQL`
        SELECT * FROM users
        WHERE users.email = ${email}
        AND users.password = crypt(${password}, password)
        LIMIT 1;
      `,
    );

    if (result.rows.length) {
      // Omit password field
      const { password: pw, ...others } = result.rows[0];
      const token = signToken({ data: others });
      res.status(200).json({ token });
    } else {
      res.status(403).json({ message: "Email or password is incorrect." });
    }
  };

  await conn(logic);
}

export { login };
