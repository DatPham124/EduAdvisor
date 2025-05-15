const express = require("express");

const MajorController = require("../controllers/major.controller");

const router = express.Router();

router.route("/").get(MajorController.getAll);
router.route("/:id").get(MajorController.getById);

module.exports = router;
