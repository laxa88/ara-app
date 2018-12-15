import { Router } from "express";

import controllers from "../../controllers";

export default (router: Router) => {
  router.get("/v1/users", controllers.user.getUsers);

  router.post("/v1/users", controllers.user.addUser);

  router.put("/v1/users", controllers.user.updateUser);
};
