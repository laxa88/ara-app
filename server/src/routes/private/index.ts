import express from "express";

import authenticate from "../../middleware/auth";

import houses from "./houses";
import payments from "./payments";
import users from "./users";

const router = express.Router();

router.use(authenticate);

users(router);
houses(router);
payments(router);

export default router;
