const express = require("express");

const DualMajorController = require("../controllers/dualMajor.controller");

const router = express.Router();

router.route("/").get(DualMajorController.getAll);

module.exports = router;
