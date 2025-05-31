const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    isProfessor: {
        type: Boolean,
        required: true
    },
    score: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('User', UserSchema);