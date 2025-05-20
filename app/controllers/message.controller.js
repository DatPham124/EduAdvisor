const MongooseQuery = require("../utils/query.util");
const ApiError = require("../api-error");
const catchAsync = require("../utils/catchAsync.util");
const Message = require("../models/message.model");

exports.sendMessage = async (req, res, next) => {
  const { question, user_id } = req.body;
  if (!req.body?.question || !req.body?.user_id) {
    return next(new ApiError(400, "Vui lòng đăng ký và nhập câu hỏi"));
  }
  try {
    const message = await Message.create({
      question,
      user_id,
    });
    const messages = await Message.find({ user_id }); // Lấy toàn bộ lịch sử mới

    return res.send({
      messages,
    });
  } catch (error) {
    return next(new ApiError(500, `Gửi câu hỏi: ${error}`));
  }
};

exports.getByUserId = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const messages = await Message.getMessagesByUserId(id);

  if (!messages) {
    return next(new ApiError("No messages found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      messages,
    },
  });
});
