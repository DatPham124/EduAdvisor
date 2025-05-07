const mongoose = require('mongoose');

const majorExamGroupSchema = new mongoose.Schema({
    major_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'majors',
        required: [true, 'Mã ngành là bắt buộc'],
    },
    examGroup_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'examgroups',
        required: [true, 'Mã nhóm môn thi là bắt buộc'],
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

const MajorExGroup = mongoose.model('majorexamgroups', majorExamGroupSchema);

module.exports = MajorExGroup;
