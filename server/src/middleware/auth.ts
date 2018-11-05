import Express from "express";
import jwt from "jsonwebtoken";
import config from "../../../config";

const authenticate = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
) => {
  // Note: value should be 'Bearer XXX'
  const token = req.headers.authorization || "";

  // Get the token string after 'Bearer'
  const data = token.split(" ")[1];

  jwt.verify(data, config.secret, (err) => {
    if (err) {
      res.status(401).json({
        message: "Unauthorised",
      });

      return;
    }

    next();
  });
};

export default authenticate;
