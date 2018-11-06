import Express from "express";
import pg from "pg";
import SQL from "sql-template-strings";
import { IUser } from "../definitions/user";
import conn from "../helpers/conn";
import { parseToken } from "../helpers/token";

const getPayments = async (req: Express.Request, res: Express.Response) => {
  const userData: IUser = parseToken(req.headers.authorization);

  const logic = async (pc: pg.PoolClient) => {
    const result = await pc.query(
      SQL`
        SELECT * FROM payments
        WHERE user_id = ${userData.id}
        ORDER BY id DESC
      `,
    );

    res.status(200).json(result.rows);
  };

  await conn(logic);
};

const addPayment = async (req: Express.Request, res: Express.Response) => {
  const { date_created, date_paid } = req.body;

  const userData: IUser = parseToken(req.headers.authorization);

  if (!date_created || !date_paid) {
    res.status(403).json({ message: "Incomplete data." });
    return;
  }

  const logic = async (pc: pg.PoolClient) => {
    await pc.query(
      SQL`
        INSERT INTO payments (user_id, date_created, date_paid, approved)
        VALUES (${userData.id}, ${date_created}, ${date_paid}, false);
      `,
    );

    res.status(200).json({ message: "Success." });
  };

  await conn(logic);
};

const updatePayment = async (req: Express.Request, res: Express.Response) => {
  const logic = async (pc: pg.PoolClient) => {
    // TODO
  };

  await conn(logic);
};

const approvePayment = async (req: Express.Request, res: Express.Response) => {
  const logic = async (pc: pg.PoolClient) => {
    // TODO
  };

  await conn(logic);
};

export { getPayments, addPayment, updatePayment, approvePayment };
