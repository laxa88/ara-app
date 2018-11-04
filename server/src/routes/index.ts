import express from "express";
import controllers from "../controllers";

const router = express.Router();

router.get("/v1/users", controllers.user.getUsers);
router.get("/v1/houses", controllers.house.getHouses);

export default router;
