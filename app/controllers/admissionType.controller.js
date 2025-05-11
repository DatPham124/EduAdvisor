const ApiError = require("../utils/error.util");
const MongooseQuery = require("../utils/query.util");
const catchAsync = require("../utils/catchAsync.util");

const AdType = require("../models/admissionType.model");

exports.getAll = catchAsync(async (req, res, next) => {
  let mongooseQuery = new MongooseQuery(AdType.find(), { ...req.query });
  mongooseQuery.filter().sort().paginate();

  const adType = await mongooseQuery.query;

  if (!adType) {
    return next(new ApiError("No addmission type found", 404));
  }

  res.status(200).json({
    status: "success",
    results: adType.length,
    data: {
      adType,
    },
  });
});
