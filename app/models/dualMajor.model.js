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
    type: String,
    required: [true, "Thời gian đào tạo là bắt buộc"],
  },
  degree: {
    type: String,
    require: true,
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
