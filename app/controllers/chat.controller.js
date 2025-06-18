const mongoose = require("mongoose");
const axios = require("axios");
const ApiError = require("../api-error");
const catchAsync = require("../utils/catchAsync.util");
const User = require("../models/user.model");

exports.chat = async (req, res, next) => {
  const { user_id, question } = req.body;
  if (!req.body?.question || !req.body?.user_id) {
    res.json({ answer: "Vui lòng nhập câu hỏi" });
  }
  const user = await User.findById(user_id);
  const userInfo = `Thông tin học sinh: ${user.name}, sở thích: ${user.favorite}`;
  try {
    const response = await axios.post("http://localhost:5000/chat", {
      question,
      user_info: userInfo,
    });
    res.json({ answer: response.data.answer });
  } catch (error) {
    return next(new ApiError(500, `Không thể trả lời câu hỏi: ${error}`));
  }
};

exports.getByUserId = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return next(new ApiError("No user found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
