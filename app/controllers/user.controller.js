const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../api-error");
const User = require("../models/user.model");

exports.register = async (req, res, next) => {
  const { Name, Email, Phone, Address, School, Password, Favorite } = req.body;

  if (
    !req.body?.Name ||
    !req.body?.Email ||
    !req.body?.Phone ||
    !req.body?.Address ||
    !req.body?.Password
  ) {
    return next(new ApiError(400, "Vui lòng điền đầy đủ thông tin"));
  }

  try {
    const ExistUser = await User.find({ Email });
    if (ExistUser.length != 0) {
      console.log(ExistUser);
      return next(new ApiError(400, "Email đã được đăng ký"));
    }
    const hashedPassword = await bcrypt.hash(Password, 10);
    const user = await User.create({
      Name,
      Email,
      Phone,
      Address,
      School,
      Password,
      Favorite,
    });
    return res.send(user);
  } catch (error) {
    return next(new ApiError(500, `Đăng ký tài khoản thất bại: ${error}`));
  }
};

exports.login = async (req, res, next) => {
  if (!req.body?.Email || !req.body?.Password) {
    return next(new ApiError(400, "Vui lòng điền đầy đủ thông tin"));
  }

  const { Email, Password } = req.body;
  try {
    let user;
    user = await User.findOne({ Email });

    if (!user) return next(new ApiError(400, "Email không tồn tại"));

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return next(new ApiError(400, "Mật khẩu không đúng"));
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    return res.json({ token });
  } catch (error) {
    return next(new ApiError(500, `Đăng nhập thất bại: ${error}`));
  }
};
