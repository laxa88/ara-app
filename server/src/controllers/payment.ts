import { Request, Response } from "express";
import moment from "moment";
import pg from "pg";
import SQL from "sql-template-strings";
import { IPayment } from "../definitions/payment";
import { IUser, UserType } from "../definitions/user";
import conn from "../helpers/conn";
import { handleException } from "../helpers/error";
import { parseToken } from "../helpers/token";

const getUserPaymentsSQL = (userId: number) => {
  return SQL`
    SELECT
      payments.id as payment_id,
      attachments.id as attachment_id,
      amount,
      approver_id,
      date_created,
      amount,
      remarks,
      file_name
    FROM payments
    LEFT JOIN attachments
    ON attachments.payment_id = payments.id
    WHERE payments.user_id = ${userId}
    ORDER BY payments.id DESC
  `;
};

const getAllPaymentsSQL = () => {
  return SQL`
    SELECT
      payments.id as payment_id,
      payments.user_id as user_id,
      attachments.id as attachment_id,
      amount,
      approver_id,
      date_created,
      amount,
      remarks,
      file_name
    FROM payments
    LEFT JOIN attachments
    ON attachments.payment_id = payments.id
    ORDER BY payments.id DESC
  `;
};

const getMonthPaymentsSQL = () => {
  return SQL`
    SELECT
      payments.id as payment_id,
      attachments.id as attachment_id,
      amount,
      approver_id,
      date_created,
      amount,
      remarks,
      file_name
    FROM payments
    LEFT JOIN attachments
    ON attachments.payment_id = payments.id
    ORDER BY payments.id DESC
  `;
};

const reducePaymentRows = (rows: any) => {
  return rows.reduce((acc: IPayment[], curr: any) => {
    const {
      amount,
      remarks,
      attachment_id,
      date_created,
      file_name,
      payment_id,
      user_id,
    } = curr;

    let payment = acc.find((item: IPayment) => item.id === payment_id);

    if (!payment) {
      payment = {
        amount,
        attachments: [],
        date_created: moment(date_created).format(),
        id: payment_id,
        remarks,
        user_id,
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
};

const getPayments = async (req: Request, res: Response) => {
  const userData: IUser = parseToken(req.headers.authorization);

  const logic = async (pc: pg.PoolClient) => {
    const result = await pc.query(getUserPaymentsSQL(userData.data.id));
    const payments = reducePaymentRows(result.rows);
    res.status(200).json(payments);
  };

  try {
    await conn(logic);
  } catch (e) {
    handleException(e, res);
  }
};

const getUserPayments = async (req: Request, res: Response) => {
  const { id } = req.params;

  const logic = async (pc: pg.PoolClient) => {
    const result = await pc.query(getUserPaymentsSQL(id));
    const payments = reducePaymentRows(result.rows);
    res.status(200).json(payments);
  };

  try {
    await conn(logic);
  } catch (e) {
    handleException(e, res);
  }
};

const getAllPayments = async (req: Request, res: Response) => {
  const logic = async (pc: pg.PoolClient) => {
    const result = await pc.query(getAllPaymentsSQL());
    const payments = reducePaymentRows(result.rows);
    res.status(200).json(payments);
  };

  try {
    await conn(logic);
  } catch (e) {
    handleException(e, res);
  }
};

const getMonthPayments = async (req: Request, res: Response) => {
  const logic = async (pc: pg.PoolClient) => {
    const result = await pc.query(getMonthPaymentsSQL());
    const payments = reducePaymentRows(result.rows);
    res.status(200).json(payments);
  };

  try {
    await conn(logic);
  } catch (e) {
    handleException(e, res);
  }
};

const addPayment = async (req: Request, res: Response) => {
  const { amount, remarks } = req.body;

  const userData: IUser = parseToken(req.headers.authorization);

  if (!amount) {
    res.status(403).json({ message: "Incomplete data." });
    return;
  }

  const logic = async (pc: pg.PoolClient) => {
    const dateCreated = moment();

    await pc.query(
      SQL`
        INSERT INTO payments (
          user_id,
          date_created,
          amount,
          remarks
        )
        VALUES (
          ${userData.data.id},
          ${dateCreated},
          ${amount},
          ${remarks}
        );
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

const updatePayment = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { amount, remarks } = req.body;

  const userData: IUser = parseToken(req.headers.authorization);

  if (!amount) {
    res.status(403).json({ message: "Incomplete data." });
    return;
  }

  const logic = async (pc: pg.PoolClient) => {
    const result = await pc.query(
      SQL`
        UPDATE payments
        SET amount = ${amount},
            remarks = ${remarks}
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

const approvePayment = async (req: Request, res: Response) => {
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
    const currDate = moment().format("YYYY-MM");

    const result = await pc.query(
      SQL`
        UPDATE payments
        SET approved = ${approved === "true"}
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

export {
  getPayments,
  getUserPayments,
  getAllPayments,
  getMonthPayments,
  addPayment,
  updatePayment,
  approvePayment,
};
