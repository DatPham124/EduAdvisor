const ApiError = require("../utils/error.util");
const MongooseQuery = require("../utils/query.util");
const catchAsync = require("../utils/catchAsync.util");

const AdInfo = require("../models/admissionInfo.model");

exports.getAll = catchAsync(async (req, res, next) => {
  let mongooseQuery = new MongooseQuery(AdInfo.find(), { ...req.query });
  mongooseQuery.filter().sort().paginate();

  const adInfo = await mongooseQuery.query;

  if (!adInfo) {
    return next(new ApiError("No addmission information found", 404));
  }

  res.status(200).json({
    status: "success",
    results: adInfo.length,
    data: {
      adInfo,
    },
  });
});
