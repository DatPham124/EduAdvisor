const mongoose = require("mongoose");

const examGroupSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  subjects: {
    type: String,
    required: true,
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

const ExamGroup = mongoose.model("examgroups", examGroupSchema);

module.exports = ExamGroup;
