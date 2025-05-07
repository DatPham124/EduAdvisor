const mongoose = require('mongoose');

const userQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const UserQuestion = mongoose.model('userquestions', userQuestionSchema);

module.exports = UserQuestion;