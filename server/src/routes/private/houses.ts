import { Router } from "express";

import controllers from "../../controllers";

export default (router: Router) => {
  router.get("/v1/houses", controllers.house.getHouses);

  router.put("/v1/houses/:id", controllers.house.updateHouse);
};
