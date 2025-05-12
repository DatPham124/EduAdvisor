const express = require("express");

const TeacherController = require("../controllers/teacher.controller");

const router = express.Router();

router.route("/").get(TeacherController.getAll);

module.exports = router;
