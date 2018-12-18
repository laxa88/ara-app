import { Router } from "express";
import multer from "multer";

import controllers from "../../controllers";

const storage = multer.memoryStorage();
const upload = multer({ dest: "attachments/", storage });

export default (router: Router) => {
  router.post(
    "/v1/attachments",
    upload.array("files"),
    controllers.attachment.addAttachment,
  );

  router.delete("/v1/attachments/:id", controllers.attachment.deleteAttachment);
};
