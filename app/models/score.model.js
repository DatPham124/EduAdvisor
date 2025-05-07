const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    major_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'majors',
        required: true
    },
    year_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'years',
        required: true
    },
    adType_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admissiontypes',
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Score = mongoose.model('scores', scoreSchema);

module.exports = Score;