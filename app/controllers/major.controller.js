const ApiError = require('../utils/error.util');
const MongooseQuery = require('../utils/query.util');
const catchAsync = require('../utils/catchAsync.util');

const Major = require('../models/major.model');

exports.getAll = catchAsync(async (req, res, next) => {
    let mongooseQuery = new MongooseQuery(Major.find(), { ...req.query });
    mongooseQuery.filter().sort().paginate();

    const majors = await mongooseQuery.query;

    if (!majors) {
        return next(new ApiError('No majors found', 404));
    }

    res.status(200).json({
        status: 'success',
        results: majors.length,
        data: {
            majors,
        },
    });
});