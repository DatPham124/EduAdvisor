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

  // Tìm người dùng
  const user = await User.findById(user_id);
  if (!user) {
    return res.status(404).json({ error: "Người dùng không tồn tại" });
  }

  const userInfo = `Thông tin học sinh: ${user.name}, sở thích: ${user.favorite}`;

  // Tìm hoặc tạo lịch sử
  let historyRecord = await HistoryConversation.findOne({ userId: user_id });
  if (!historyRecord) {
    historyRecord = new HistoryConversation({
      userId: user_id,
      conversations: [], // 🟢 Đúng tên field theo schema
    });
    await historyRecord.save();
  }

  // 🟢 Chuyển đổi conversations sang định dạng Gemini yêu cầu
  const formattedHistory = historyRecord.conversations.flatMap(item => [
    { role: "user", parts: item.question },
    { role: "model", parts: item.answer }
  ]);

  // Gọi Flask
  let answer;
  try {
    const response = await axios.post("http://localhost:5000/chat", {
      question,
      user_info: userInfo,
      history: formattedHistory,
    });
    answer = response.data.answer;
  } catch (err) {
    console.error("Lỗi gọi API Flask:", err.message);
    return res.status(500).json({ error: "Lỗi khi kết nối chatbot" });
  }

  // Lưu lại vào lịch sử
  try {
    await HistoryConversation.findOneAndUpdate(
      { userId: user_id },
      {
        $push: {
          conversations: [
            { question: question, answer: answer }
          ],
        },
      },
      { new: true }
    );
  } catch (err) {
    console.error("Lỗi khi cập nhật lịch sử:", err);
    return res.status(500).json({ error: "Không thể lưu lịch sử hội thoại" });
  }

  return res.json({ answer });
};





// Lấy lịch sử hội thoại
exports.getConversation = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const response = await HistoryConversation.findOne({ userId: id });

  const conversations = response?.conversations || [];

  return res.json({ conversations });
});
