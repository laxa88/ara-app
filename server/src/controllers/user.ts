import Express from "express";
import pg from "pg";
import SQL from "sql-template-strings";
import { IUser, UserType } from "../definitions/user";
import conn from "../helpers/conn";
import { parseToken } from "../helpers/token";

const getUsers = async (req: Express.Request, res: Express.Response) => {
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
};

const addUser = async (req: Express.Request, res: Express.Response) => {
  const {
    user_type,
    house_id,
    email,
    password,
    first_name,
    last_name,
  } = req.body;

  const userData: IUser = parseToken(req.headers.authorization);

  if (
    userData.user_type !== UserType.SUPER &&
    userData.user_type !== UserType.ADMIN
  ) {
    res.status(403).json({ message: "Unathorised user." });
    return;
  }

  if (
    !user_type ||
    !house_id ||
    !email ||
    !password ||
    !first_name ||
    !last_name
  ) {
    res.status(403).json({ message: "Incomplete data." });
    return;
  }

  const logic = async (pc: pg.PoolClient) => {
    const result1 = await pc.query(
      SQL`
      SELECT * from houses
      WHERE houses.id = ${house_id}
      `,
    );

    if (!result1.rowCount) {
      res.status(400).json({ message: "Invalid house ID." });
      return;
    }

    await pc.query(
      SQL`
      INSERT INTO users (user_type, house_id, email, password, first_name, last_name)
      VALUES(${user_type}, ${house_id}, ${email}, crypt(${password}, gen_salt('bf')), ${first_name}, ${last_name})
      `,
    );

    res.status(200).json({ message: "Success." });
  };

  await conn(logic);
};

const updateUser = async (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  const {
    user_type,
    house_id,
    email,
    password,
    first_name,
    last_name,
  } = req.body;

  const userData: IUser = parseToken(req.headers.authorization);

  // Only SUPER users or the user themselves can update user data.
  if (userData.user_type !== UserType.SUPER && userData.id !== id) {
    res.status(403).json({ message: "Unathorised user." });
    return;
  }

  if (
    !user_type ||
    !house_id ||
    !email ||
    !password ||
    !first_name ||
    !last_name
  ) {
    res.status(403).json({ message: "Incomplete data." });
    return;
  }

  const logic = async (pc: pg.PoolClient) => {
    const result = await pc.query(
      SQL`
        UPDATE users
        SET
          ${
            // Only SUPER users can change user type.
            userData.user_type === UserType.SUPER
              ? `user_type = ${user_type}`
              : ""
          }
          house_id = ${house_id}
          email = ${email}
          password = ${password}
          first_name = ${first_name}
          last_name = ${last_name}
        WHERE id = ${id}
      `,
    );

    if (result.rowCount) {
      res.status(200).json({ message: "Success." });
    } else {
      res.status(400).json({ message: "User ID not found." });
    }
  };

  await conn(logic);
};

export { getUsers, addUser, updateUser };
