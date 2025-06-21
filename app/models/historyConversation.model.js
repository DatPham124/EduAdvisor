const mongoose = require("mongoose");

const conversationItemSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const historyConversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "Id người dùng trống"],
  },
  conversations: [conversationItemSchema],
});

module.exports = mongoose.model(
  "HistoryConversations",
  historyConversationSchema
);
