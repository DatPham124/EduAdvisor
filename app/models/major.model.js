const mongoose = require('mongoose');
const validator = require('validator');

const majorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Tên chuyên ngành là bắt buộc'],
            trim: true,
            minlength: [2, 'Tên chuyên ngành phải có ít nhất 2 ký tự'],
            maxlength: [255, 'Tên chuyên ngành không được vượt quá 255 ký tự'],
        },
        code: {
            type: String,
            required: [true, 'Mã chuyên ngành là bắt buộc'],
            unique: true,
            trim: true,
            minlength: [2, 'Mã chuyên ngành phải có ít nhất 2 ký tự'],
            maxlength: [10, 'Mã chuyên ngành không được vượt quá 10 ký tự'],
            validate: {
                validator: function (value) {
                    return /^[A-Z0-9]+$/.test(value); // Chỉ cho phép chữ hoa và số
                },
                message: 'Mã chuyên ngành chỉ được chứa chữ hoa và số',
            },
        },
        description: {
            type: String,
            trim: true,
        },
        falculty: {
            type: String,
            required: [true, 'Khoa là bắt buộc'],
            trim: true,
            minlength: [2, 'Khoa phải có ít nhất 2 ký tự'],
            maxlength: [255, 'Khoa không được vượt quá 255 ký tự'],
        },
        fee: {
            type: Number,
            required: [true, 'Học phí là bắt buộc'],
            min: [0, 'Học phí không được âm'],

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

const Major = mongoose.model('Majors', majorSchema);

module.exports = Major;