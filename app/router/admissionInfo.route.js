const express = require("express");

const AdInfoController = require("../controllers/admissionInfo.controller");

const router = express.Router();

router.route("/").get(AdInfoController.getAll);

module.exports = router;
