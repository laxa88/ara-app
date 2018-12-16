import { Router } from "express";
import multer from "multer";
import controllers from "../../controllers";

const storage = multer.memoryStorage();
const upload = multer({ dest: "attachments/", storage });

export default (router: Router) => {
  router.get("/v1/payments", controllers.payment.getPayments);

  router.get("/v1/payments/all", controllers.payment.getAllPayments);

  router.get("/v1/payments/month", controllers.payment.getMonthPayments);

  router.get("/v1/payments/:id", controllers.payment.getUserPayments);

  router.post(
    "/v1/payments",
    upload.array("files"),
    controllers.payment.addPayment,
  );

  router.put(
    "/v1/payments/:id",
    upload.array("files"),
    controllers.payment.updatePayment,
  );

  router.put("/v1/payments/:id/approve", controllers.payment.approvePayment);

  router.put(
    "/v1/payments/:id/approve/month",
    controllers.payment.approveMonthPayment,
  );
};
