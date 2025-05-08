const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
    required: [true, "Email là bắt buộc"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Vui lòng nhập địa chỉ email hợp lệ"],
  },
  phone: {
    type: String,
    required: [true, "Số điện thoại là bắt buộc"],
    unique: true,
    validate: {
      validator: function (value) {
        return /^(0[3|5|7|8|9]|01[2|6|8|9])[0-9]{8}$/.test(value); // Kiểm tra số điện thoại
      },
      message: "Số điện thoại không hợp lệ",
    },
  },
  address: {
    type: String,
    required: [true, "Địa chỉ là bắt buộc"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Mật khẩu là bắt buộc"],
    minlength: [8, "Mật khẩu phải có ít nhất 8 ký tự"],
  },
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "roles",
    required: [true, "Mã vai trò là bắt buộc"],
  },
  isActive: {
    type: Boolean,
    default: true,
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

// Brecrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Chỉ mã hóa nếu mật khẩu đã được thay đổi
  this.password = await bcrypt.hash(this.password, salt); // Mã hóa mật khẩu
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password); // So sánh mật khẩu đã mã hóa với mật khẩu đầu vào
};

const User = mongoose.model("users", userSchema); // Tạo model User từ schema

module.exports = User; // Xuất model User
