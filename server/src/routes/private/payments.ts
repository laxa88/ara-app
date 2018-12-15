import { Router } from "express";
import multer from "multer";
import controllers from "../../controllers";

const storage = multer.memoryStorage();
const upload = multer({ dest: "attachments/", storage });

export default (router: Router) => {
  /**
   * Gets list of payments of current user
   *
   * - (default): Returns a list of payments of current user
   * - ?type=all: Returns a list of payments of all users (ADMIN/SUPER)
   * - ?type=month: Returns a list of payment dates of all users (ADMIN/SUPER)
   * - ?user={id}: Returns a list of payments of "type" of target user "id"
   */
  router.get("/v1/payments", controllers.payment.getPayments);

  /**
   * Creates a new payment for current user
   */
  router.post(
    "/v1/payments",
    upload.array("files"),
    controllers.payment.addPayment,
  );

  /**
   * Updates a payment
   */
  router.put(
    "/v1/payments/:id",
    upload.array("files"),
    controllers.payment.updatePayment,
  );

  /**
   * Updates the approval status of a payment
   */
  router.put("/v1/payments/:id/approve", controllers.payment.approvePayment);
};
