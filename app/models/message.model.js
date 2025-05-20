const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  anwser: {
    type: String,
    default: "Hông biết",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

messageSchema.statics.getMessagesByUserId = function (userId) {
  return this.find({ user_id: userId }).sort({ createdAt: 1 });
};
const Message = mongoose.model("messages", messageSchema);

module.exports = Message;
