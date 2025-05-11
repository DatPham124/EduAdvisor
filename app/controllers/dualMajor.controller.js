const ApiError = require("../utils/error.util");
const MongooseQuery = require("../utils/query.util");
const catchAsync = require("../utils/catchAsync.util");

const DualMajor = require("../models/dualMajor.model");

exports.getAll = catchAsync(async (req, res, next) => {
  let mongooseQuery = new MongooseQuery(DualMajor.find(), { ...req.query });
  mongooseQuery.filter().sort().paginate();

  const dualMajors = await mongooseQuery.query;

  if (!dualMajors) {
    return next(new ApiError("No dual major found", 404));
  }

  res.status(200).json({
    status: "success",
    results: dualMajors.length,
    data: {
      dualMajors,
    },
  });
});
