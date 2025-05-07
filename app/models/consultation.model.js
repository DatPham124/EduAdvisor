const mongoose = require('mongoose');

const ConsultationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    advisor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    major_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'majors',
        required: true
    },
    datetime: {
        type: Date,
        required: true
    },
    question: {
        type: String,
        required: false,
    },
    note: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'processing', 'completed'],
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

const Consultation = mongoose.model('consultations', ConsultationSchema);

module.exports = Consultation;
