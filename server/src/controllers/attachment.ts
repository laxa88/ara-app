import Express from "express";
import fs from "fs";
import pg from "pg";
import SQL from "sql-template-strings";
import uuidv4 from "uuid/v4";
import { IUser } from "../definitions/user";
import conn from "../helpers/conn";
import { handleException } from "../helpers/error";
import { parseToken } from "../helpers/token";

const addAttachment = async (req: Express.Request, res: Express.Response) => {
  const { payment_id } = req.body;

  const files: any = req.files;

  const userData: IUser = parseToken(req.headers.authorization);

  if (!payment_id) {
    res.status(403).json({ message: "Incomplete data." });
    return;
  }

  if (!files.length) {
    res.status(403).json({ message: "No files to upload." });
    return;
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "text/plain",
  ];

  for (const f of files) {
    if (allowedTypes.indexOf(f.mimetype) === -1) {
      res.status(403).json({ message: "Invalid file type." });
      return;
    }
  }

  const maxFilesAllowed = 10;

  const logic = async (pc: pg.PoolClient) => {
    const result1 = await pc.query(
      SQL`
        SELECT * FROM payments
        INNER JOIN users
        ON payments.user_id = users.id
        AND payments.id = ${payment_id}
        AND users.id = ${userData.id}
        LEFT JOIN attachments
        ON attachments.payment_id = payments.id
      `,
    );

    if (!result1.rowCount) {
      res.status(400).json({ message: "Invalid user or payment ID." });
      return;
    }

    if (
      result1.rowCount >= maxFilesAllowed ||
      result1.rowCount + +files.length > maxFilesAllowed
    ) {
      console.log("###", result1.rowCount, files.length);
      res
        .status(400)
        .json({ message: `Cannot upload more than ${maxFilesAllowed} files.` });

      return;
    }

    const basePath = "uploads";
    const userPath = `${basePath}/${userData.id}`;
    const paymentPath = `${userPath}/${payment_id}`;

    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath);
    }

    if (!fs.existsSync(userPath)) {
      fs.mkdirSync(userPath);
    }

    if (!fs.existsSync(paymentPath)) {
      fs.mkdirSync(paymentPath);
    }

    const errors = [];

    for (const f of files) {
      try {
        const splitname = f.originalname.split(".");
        const extension = splitname[splitname.length - 1];
        const hashedName = uuidv4();
        const filename = `${hashedName}.${extension}`;
        const filePath = `${paymentPath}/${filename}`;
        fs.writeFileSync(filePath, f.buffer);

        const r = await pc.query(
          SQL`
          INSERT INTO attachments (payment_id, file_name)
          VALUES (${payment_id}, ${filename});
        `,
        );

        if (!r.rowCount) {
          errors.push("Could not update attachment into database");
        }
      } catch (e) {
        errors.push(e.toString());
      }
    }

    if (errors.length) {
      res.status(400).json({ message: errors });
    } else {
      res.status(200).json({ files });
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
  const { id } = req.params;

  const userData: IUser = parseToken(req.headers.authorization);

  const logic = async (pc: pg.PoolClient) => {
    const result1 = await pc.query(
      SQL`
        SELECT *
        FROM attachments
        INNER JOIN payments
        ON attachments.payment_id = payments.id
        INNER JOIN users
        ON payments.user_id = users.id
        AND attachments.id = ${id}
        AND users.id = ${userData.id}
      `,
    );

    if (!result1.rowCount) {
      res.status(400).json({ message: "Invalid user or attachment ID." });
      return;
    }

    // TODO delete file logic goes here

    const result2 = await pc.query(
      SQL`
        DELETE FROM attachments
        WHERE id = ${id}
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

export { addAttachment, deleteAttachment };
