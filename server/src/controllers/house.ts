import Express from "express";
import pg from "pg";
import SQL from "sql-template-strings";
import { IUser, UserType } from "../definitions/user";
import conn from "../helpers/conn";
import { handleException } from "../helpers/error";
import { parseToken } from "../helpers/token";

const getHouses = async (req: Express.Request, res: Express.Response) => {
  const logic = async (pc: pg.PoolClient) => {
    const result = await pc.query(SQL`SELECT * FROM houses ORDER BY id ASC`);
    res.status(200).json(result.rows);
  };

  try {
    await conn(logic);
  } catch (e) {
    handleException(e, res);
  }
};

const updateHouse = async (req: Express.Request, res: Express.Response) => {
  const { id } = req.params;
  const { road_number, house_number, unit_number } = req.body;

  const userData: IUser = parseToken(req.headers.authorization);

  if (userData.data.user_type !== UserType.SUPER) {
    res.status(403).json({ message: "Unathorised user." });
    return;
  }

  if (!road_number || !house_number || !unit_number) {
    res.status(403).json({ message: "Incomplete data." });
    return;
  }

  const logic = async (pc: pg.PoolClient) => {
    const result = await pc.query(
      SQL`
        UPDATE houses
        SET
          road_number = ${road_number},
          house_number = ${house_number},
          unit_number = ${unit_number}
        WHERE id = ${id}
      `,
    );

    if (result.rowCount) {
      res.status(200).json({ message: "Success." });
    } else {
      res.status(400).json({ message: "House ID not found." });
    }
  };

  try {
    await conn(logic);
  } catch (e) {
    handleException(e, res);
  }
};

export { getHouses, updateHouse };
