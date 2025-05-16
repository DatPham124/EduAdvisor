const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../api-error");
const User = require("../models/user.model");

exports.register = async (req, res, next) => {
  const { name, email, phone, address, school, favorite } = req.body;
  console.log(req.body);
  if (!req.body?.name || !req.body?.phone || !req.body?.favorite) {
    return next(new ApiError(400, "Vui lòng điền đầy đủ thông tin"));
  }

  try {
    const user = await User.create({
      name,
      email,
      phone,
      address,
      school,
      favorite,
    });
    return res.send(user);
  } catch (error) {
    return next(new ApiError(500, `Đăng ký tài khoản thất bại: ${error}`));
  }
};
