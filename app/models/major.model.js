const mongoose = require("mongoose");
const validator = require("validator");

const majorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Tên chuyên ngành là bắt buộc"],
    trim: true,
    minlength: [2, "Tên chuyên ngành phải có ít nhất 2 ký tự"],
    maxlength: [255, "Tên chuyên ngành không được vượt quá 255 ký tự"],
  },
  code: {
    type: String,
    required: [true, "Mã chuyên ngành là bắt buộc"],
    unique: true,
    trim: true,
    minlength: [7, "Mã chuyên ngành phải có ít nhất 7 ký tự"],
    maxlength: [7, "Mã chuyên ngành không được vượt quá 7 ký tự"],
    validate: {
      validator: function (value) {
        return /^[A-Z0-9]+$/.test(value); // Chỉ cho phép chữ hoa và số
      },
      message: "Mã chuyên ngành chỉ được chứa chữ hoa và số",
    },
  },
  description: {
    type: String,
    trim: true,
  },

  fee: {
    type: String,
    required: [true, "Học phí là bắt buộc"],
  },
  quantity: {
    type: Number,
    required: [true, "Số lượng là bắt buộc"],
    min: [0, "Số lượng không được âm"],
  },
  tilte: {
    type: String,
    required: [true, "Danh hiệu là bắt buộc"],
  },
  duration: {
    type: String,
    required: [true, "Thời gian đào tạo là bắt buộc"],
  },
  position: {
    type: String,
    required: false,
  },

  isPopular: {
    type: Boolean,
    default: false,
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

const Major = mongoose.model("majors", majorSchema);

module.exports = Major;
