const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Tên giảng viên là bắt buộc"],
    trim: true,
    maxlength: [50, "Tên giảng viên không được vượt quá 50 ký tự"],
  },

  description: {
    type: String,
    trim: true,
  },

  tilte: {
    type: String,
    required: [true, "Danh hiệu là bắt buộc"],
    trim: true,
  },
});

const Teacher = mongoose.model("teachers", teacherSchema);

module.exports = Teacher;
