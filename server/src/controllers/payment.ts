import Express from "express";
import pg from "pg";
import SQL from "sql-template-strings";
import { IAttachment, IPayment } from "../definitions/payment";
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
        SELECT
          attachments.id as attachment_id,
          payments.id as payment_id,
          approved,
          date_approved,
          date_created,
          date_paid,
          file_name
        FROM payments
        LEFT JOIN attachments
        ON attachments.payment_id = payments.id
        WHERE payments.user_id = ${userData.data.id}
        ORDER BY payments.id DESC
      `,
    );

    const payments = result.rows.reduce((acc: IPayment[], curr) => {
      const {
        payment_id,
        attachment_id,
        approved,
        date_approved,
        date_created,
        date_paid,
        file_name,
      } = curr;

      let payment = acc.find((item: IPayment) => item.id === payment_id);

      if (!payment) {
        payment = {
          approved,
          attachments: [],
          date_approved,
          date_created,
          date_paid,
          id: payment_id,
        };

        acc.push(payment);
      }

      if (attachment_id) {
        payment.attachments.push({
          file_name,
          id: attachment_id,
        });
      }

      // Sort attachments from latest to oldest
      payment.attachments.sort((a, b) => (a.id > b.id ? -1 : 0));

      return acc;
    }, []);

    res.status(200).json(payments);
  };

  try {
    await conn(logic);
  } catch (e) {
    handleException(e, res);
  }
};

const addPayment = async (req: Express.Request, res: Express.Response) => {
  const { date_paid } = req.body;

  const userData: IUser = parseToken(req.headers.authorization);

  if (!date_paid) {
    res.status(403).json({ message: "Incomplete data." });
    return;
  }

  const logic = async (pc: pg.PoolClient) => {
    const dateCreated = formatDate();

    await pc.query(
      SQL`
        INSERT INTO payments (user_id, date_created, date_paid, approved)
        VALUES (${userData.data.id}, ${dateCreated}, ${date_paid}, false);
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
        AND user_id = ${userData.data.id}
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
    userData.data.user_type !== UserType.SUPER &&
    userData.data.user_type !== UserType.ADMIN
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
        AND user_id = ${userData.data.id}
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
