const mongoose = require('mongoose');

const majorAdminissionTypeSchema = new mongoose.Schema({
    major_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'majors',
        required: [true, 'Mã chuyên ngành là bắt buộc'],
    },
    admissionType_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admissiontypes',
        required: [true, 'Mã hình thức tuyển sinh là bắt buộc'],
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