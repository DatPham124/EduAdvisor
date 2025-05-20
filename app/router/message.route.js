const express = require("express");

const MessageController = require("../controllers/message.controller");

const router = express.Router();

router.route("/send_message").post(MessageController.sendMessage);
router.route("/get_messages/:id").get(MessageController.getByUserId);

module.exports = router;
