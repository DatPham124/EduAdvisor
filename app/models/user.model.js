const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const salt = bcrypt.genSaltSync(10); // Tạo salt với độ khó 10

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Họ tên người dùng là bắt buộc"],
    trim: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    lowercase: true,
    validate: [validator.isEmail, "Vui lòng nhập địa chỉ email hợp lệ"],
  },
  phone: {
    type: String,
    required: [true, "Số điện thoại là bắt buộc"],
    validate: {
      validator: function (value) {
        return /^(0[3|5|7|8|9]|01[2|6|8|9])[0-9]{8}$/.test(value); // Kiểm tra số điện thoại
      },
      message: "Số điện thoại không hợp lệ",
    },
  },
  address: {
    type: String,
    trim: true,
  },
  school: {
    type: String,
    trim: true,
  },
  favorite: {
    type: String,
    require: [true, "Sở thích là bắt buộc"],
    trim: true,
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

const User = mongoose.model("users", userSchema); // Tạo model User từ schema

module.exports = User; // Xuất model User
