const mongoose = require("mongoose");
const validator = require("validator");

const dualMajorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Tên chuyên ngành là bắt buộc"],
    trim: true,
    minlength: [2, "Tên chuyên ngành phải có ít nhất 2 ký tự"],
    maxlength: [255, "Tên chuyên ngành không được vượt quá 255 ký tự"],
  },
  description: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, "Số lượng là bắt buộc"],
    min: [0, "Số lượng không được âm"],
  },

  duration: {
    type: Number,
    required: [true, "Thời gian đào tạo là bắt buộc"],
    min: [1, "Thời gian đào tạo không được nhỏ hơn 1 năm"],
    max: [10, "Thời gian không được lớn hơn 10 năm"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const dualMajor = mongoose.model("dualmajors", dualMajorSchema);

module.exports = dualMajor;
