const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
    wrongAnswers: {
        type: [String],
        required: true,
        validate: [arr => arr.length > 0, 'At least one wrong answer is required']
    },
    knowledgeArea: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 3
    }
});

module.exports = mongoose.model('Question', QuestionSchema);