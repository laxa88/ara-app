import express from "express";
import controllers from "../controllers";

const router = express.Router();

router.post("/v1/users", controllers.user.getUsers);

export default router;
