const express = require("express");

const controller = require("../controllers");

const router = express.Router();

router.post("/v1/todos", controller.post);

module.exports = router;
