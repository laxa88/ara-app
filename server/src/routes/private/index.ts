import express from "express";
import controllers from "../../controllers";
import authenticate from "../../middleware/auth";

const router = express.Router();

router.use(authenticate);
router.get("/v1/users", controllers.user.getUsers);
router.get("/v1/houses", controllers.house.getHouses);
router.post("/v1/houses/:id", controllers.house.updateHouse);

export default router;
