import jwt from "jsonwebtoken";
import config from "../../../config";
import { IUser } from "../models/user";

const signToken = (data: object) => {
  return jwt.sign(data, config.secret, {
    expiresIn: "15m",
  });
};

const parseToken = (token: string | undefined): IUser => {
  if (typeof token !== "string") {
    return {} as IUser;
  }

  return jwt.decode(token.split(" ")[1]) as IUser;
};

export { signToken, parseToken };
