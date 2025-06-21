const express = require("express");

const ChatController = require("../controllers/chat.controller");

const router = express.Router();

router.route("/chat").post(ChatController.chat);
router.route("/get_conversation/:id").get(ChatController.getConversation);

module.exports = router;
