import Express from "express";
import pg from "pg";
import SQL from "sql-template-strings";
import conn from "../helpers/conn";

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
      res.status(200).json({ message: "success" });
    } else {
      res.status(403).json({ message: "Email or password is incorrect." });
    }
  };

  await conn(logic);
}

export { login };
