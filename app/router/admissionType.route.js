const express = require("express");

const AdTypeController = require("../controllers/admissionType.controller");

const router = express.Router();

router.route("/").get(AdTypeController.getAll);

module.exports = router;
