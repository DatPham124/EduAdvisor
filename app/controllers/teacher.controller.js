const ApiError = require("../utils/error.util");
const MongooseQuery = require("../utils/query.util");
const catchAsync = require("../utils/catchAsync.util");

const Teacher = require("../models/teacher.model");

exports.getAll = catchAsync(async (req, res, next) => {
  let mongooseQuery = new MongooseQuery(Teacher.find(), { ...req.query });
  mongooseQuery.filter().sort().paginate();

  const teachers = await mongooseQuery.query;

  if (!teachers) {
    return next(new ApiError("No addmission information found", 404));
  }

  res.status(200).json({
    status: "success",
    results: teachers.length,
    data: {
      teachers,
    },
  });
});
