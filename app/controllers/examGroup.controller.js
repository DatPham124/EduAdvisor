const ApiError = require('../utils/error.util');
const MongooseQuery = require('../utils/query.util');
const catchAsync = require('../utils/catchAsync.util');

const ExamGroup = require('../models/examGroup.model');

exports.getAll = catchAsync(async (req, res, next) => {
    let mongooseQuery = new MongooseQuery(ExamGroup.find(), { ...req.query });
    mongooseQuery.filter().sort().paginate();

    const examGroups = await mongooseQuery.query;

    if (!examGroups) {
        return next(new ApiError('No exam groups found', 404));
    }

    res.status(200).json({
        status: 'success',
        results: examGroups.length,
        data: {
            examGroups,
        },
    });
}

);

