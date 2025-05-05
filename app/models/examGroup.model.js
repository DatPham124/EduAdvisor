const mongoose = require('mongoose');

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
    isActive: {
        type: Boolean,
        default: true,
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

const ExamGroup = mongoose.model('ExamGroups', examGroupSchema);

module.exports = ExamGroup;