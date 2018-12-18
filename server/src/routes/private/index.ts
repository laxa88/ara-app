import express from "express";

import authenticate from "../../middleware/auth";

import attachments from "./attachments";
import houses from "./houses";
import payments from "./payments";
import users from "./users";

const router = express.Router();

router.use(authenticate);

attachments(router);
houses(router);
payments(router);
users(router);

export default router;
