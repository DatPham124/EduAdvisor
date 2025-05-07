const mongoose = require('mongoose');

const AdmissionInfoSchema = new mongoose.Schema({
    object: {
        type: String,
        required: true,
    },
    form: {
        type: String,
        required: true,
    },
    scholartype: {
        type: String,
        required: false,
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

const AdmissionInfo = mongoose.model('admissioninfos', AdmissionInfoSchema);

module.exports = AdmissionInfo;