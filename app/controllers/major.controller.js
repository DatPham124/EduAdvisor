const ApiError = require("../utils/error.util");
const MongooseQuery = require("../utils/query.util");
const catchAsync = require("../utils/catchAsync.util");

const Major = require("../models/major.model");
const MajorExGp = require("../models/majorExGroup.model");
//const ExamGroup = require("../models/examGroup.model");

exports.getAll = catchAsync(async (req, res, next) => {
  let mongooseQuery = new MongooseQuery(Major.find(), { ...req.query });
  mongooseQuery.filter().sort().paginate();

  const majors = await mongooseQuery.query;

  if (!majors) {
    return next(new ApiError("No majors found", 404));
  }

  res.status(200).json({
    status: "success",
    results: majors.length,
    data: {
      majors,
    },
  });
});

exports.getByExanGroup = catchAsync(async (req, res, next) => {
  const majorExGps = await MajorExGp.find()
    .populate("majors")
    .populate("examgroups");

  const majors = majorExGps
    .filter((item) => item.examgroups.name === req.params)
    .map((item) => item.major);

  if (!majors) {
    return next(new ApiError("No majors found", 404));
  }

  res.status(200).json({
    status: "success",
    results: majors.length,
    data: {
      majors,
    },
  });
});
