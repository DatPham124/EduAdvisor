const mongoose = require("mongoose");
const axios = require("axios");
const ApiError = require("../api-error");
const catchAsync = require("../utils/catchAsync.util");
const User = require("../models/user.model");
const HistoryConversation = require("../models/historyConversation.model");

exports.chat = async (req, res, next) => {
  const { user_id, question } = req.body;
  if (!question || !user_id) {
    return res.json({ answer: "Vui lòng nhập câu hỏi" });
  }

  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "Người dùng không tồn tại" });
    }

    const userInfo = `Thông tin học sinh: ${user.name}, sở thích: ${user.favorite}`;

    const response = await axios.post("http://localhost:5000/chat", {
      question,
      user_info: userInfo,
    });

    const answer = response.data.answer;

    // Tạo đoạn hội thoại mới
    const newConversation = {
      question,
      answer,
      timestamp: new Date(),
    };

    // Tìm hoặc tạo mới lịch sử hội thoại
    try {
      await HistoryConversation.findOneAndUpdate(
        { userId: user_id },
        { $push: { conversations: newConversation } },
        { upsert: true, new: true }
      );
    } catch (err) {
      console.error("Lỗi khi update hoặc tạo mới lịch sử:", err);
    }

    return res.json({ answer });
  } catch (error) {
    return next(new ApiError(500, `Không thể trả lời câu hỏi: ${error}`));
  }
};

exports.getConversation = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const response = await HistoryConversation.findOne({ userId: id });

  const conversations = response?.conversations || [];

  return res.json({ conversations });
});
