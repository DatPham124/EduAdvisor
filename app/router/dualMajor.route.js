const express = require("express");

const DualMajorController = require("../controllers/dualMajor.controller");

const router = express.Router();

router.route("/").get(DualMajorController.getAll);
router.route("/:id").get(DualMajorController.getById);

module.exports = router;
