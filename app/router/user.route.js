const express = require("express");

const UserController = require("../controllers/user.controller");

const router = express.Router();

router.route("/register").post(UserController.register);

module.exports = router;
