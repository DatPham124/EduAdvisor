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

  degree: {
    type: String,
    required: [true, "Học vị là bắt buộc"],
    trim: true,
  },
});

const Teacher = mongoose.model("teachers", teacherSchema);

module.exports = Teacher;
