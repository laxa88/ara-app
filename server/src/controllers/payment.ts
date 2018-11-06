import Express from "express";
import pg from "pg";
import SQL from "sql-template-strings";
import { IUser, UserType } from "../definitions/user";
import conn from "../helpers/conn";
import { formatDate } from "../helpers/date";
import { handleException } from "../helpers/error";
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

  try {
    await conn(logic);
  } catch (e) {
    handleException(e, res);
  }
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

  try {
    await conn(logic);
  } catch (e) {
    handleException(e, res);
  }
};

const updatePayment = async (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  const { date_paid } = req.body;

  const userData: IUser = parseToken(req.headers.authorization);

  if (!date_paid) {
    res.status(403).json({ message: "Incomplete data." });
    return;
  }

  const logic = async (pc: pg.PoolClient) => {
    const result = await pc.query(
      SQL`
        UPDATE payments
        SET date_paid = ${date_paid}
        WHERE id = ${id}
        AND user_id = ${userData.id}
      `,
    );

    if (result.rowCount) {
      res.status(200).json({ message: "Success." });
    } else {
      res.status(400).json({ message: "Could not update payment." });
    }
  };

  try {
    await conn(logic);
  } catch (e) {
    handleException(e, res);
  }
};

const approvePayment = async (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  const { approved } = req.body;

  const userData: IUser = parseToken(req.headers.authorization);

  if (
    userData.user_type !== UserType.SUPER &&
    userData.user_type !== UserType.ADMIN
  ) {
    res.status(403).json({ message: "Unathorised user." });
    return;
  }

  if (!approved) {
    res.status(403).json({ message: "Incomplete data." });
    return;
  }

  const logic = async (pc: pg.PoolClient) => {
    const currDate = formatDate();

    const result = await pc.query(
      SQL`
        UPDATE payments
        SET
          date_approved = ${currDate},
          approved = ${approved === "true"}
        WHERE id = ${id}
        AND user_id = ${userData.id}
      `,
    );

    if (result.rowCount) {
      res.status(200).json({ message: "Success." });
    } else {
      res.status(400).json({ message: "Could not update payment." });
    }
  };

  try {
    await conn(logic);
  } catch (e) {
    handleException(e, res);
  }
};

export { getPayments, addPayment, updatePayment, approvePayment };
