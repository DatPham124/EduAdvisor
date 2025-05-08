const mongoose = require("mongoose");

const adminissionTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Tên hình thức tuyển sinh là bắt buộc"],
    trim: true,
    minlength: [2, "Tên hình thức tuyển sinh phải có ít nhất 2 ký tự"],
    maxlength: [255, "Tên hình thức tuyển sinh không được vượt quá 255 ký tự"],
  },
  description: {
    type: String,
    required: [true, "Mô tả hình thức tuyển sinh là bắt buộc"],
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

const AdmissionType = mongoose.model("admissiontypes", adminissionTypeSchema);

module.exports = AdmissionType;
