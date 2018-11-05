import express from "express";
import controllers from "../../controllers";

const router = express.Router();

router.post("/v1/auth", controllers.auth.login);

export default router;
