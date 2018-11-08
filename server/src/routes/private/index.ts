import express from "express";
import multer from "multer";
import controllers from "../../controllers";
import authenticate from "../../middleware/auth";

const storage = multer.memoryStorage();
const upload = multer({ dest: "attachments/", storage });

const router = express.Router();

router.use(authenticate);

router.get("/v1/users", controllers.user.getUsers);
router.post("/v1/users", controllers.user.addUser);
router.put("/v1/users", controllers.user.updateUser);

router.get("/v1/houses", controllers.house.getHouses);
router.put("/v1/houses/:id", controllers.house.updateHouse);

router.get("/v1/payments", controllers.payment.getPayments);
router.post("/v1/payments", controllers.payment.addPayment);
router.put("/v1/payments/:id", controllers.payment.updatePayment);
router.put("/v1/payments/:id/approve", controllers.payment.approvePayment);

router.post(
  "/v1/attachments",
  upload.array("files"),
  controllers.attachment.addAttachment,
);

router.delete("/v1/attachments/:id", controllers.attachment.deleteAttachment);

export default router;
