const express = require("express");

const UserController = require("../controllers/user.controller");

const router = express.Router();

router.route("/login").post(UserController.login);
router.route("/register").post(UserController.register);
router.route("/logout").post(UserController.logout);

module.exports = router;
