import Express from "express";
import pg from "pg";
import SQL from "sql-template-strings";
import { IUser } from "../definitions/user";
import conn from "../helpers/conn";
import { handleException } from "../helpers/error";
import { parseToken } from "../helpers/token";

const addAttachment = async (req: Express.Request, res: Express.Response) => {
  const { payment_id, file_name } = req.body;

  const userData: IUser = parseToken(req.headers.authorization);

  if (!payment_id || !file_name) {
    res.status(403).json({ message: "Incomplete data." });
    return;
  }

  const logic = async (pc: pg.PoolClient) => {
    const result1 = await pc.query(
      SQL`
        SELECT *
        FROM payments
        INNER JOIN users
        ON payments.user_id = users.id
        AND payments.id = ${payment_id}
        AND users.id = ${userData.id}
      `,
    );

    if (!result1.rowCount) {
      res.status(400).json({ message: "Invalid user or payment ID." });
      return;
    }

    const result2 = await pc.query(
      SQL`
        INSERT INTO attachments (payment_id, file_name)
        VALUES (${payment_id}, ${file_name});
      `,
    );

    if (result2.rowCount) {
      res.status(200).json({ message: "Success." });
    } else {
      res.status(400).json({ message: "Unable to add attachment." });
    }
  };

  try {
    await conn(logic);
  } catch (e) {
    handleException(e, res);
  }
};

const deleteAttachment = async (
  req: Express.Request,
  res: Express.Response,
) => {
  const logic = async (pc: pg.PoolClient) => {
    // TODO
  };

  try {
    await conn(logic);
  } catch (e) {
    handleException(e, res);
  }
};

export { addAttachment, deleteAttachment };
