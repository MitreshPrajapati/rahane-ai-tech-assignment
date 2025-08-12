const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: [String],
        enum: ['admin', 'editor', 'viewer'],
        default: ['viewer']
    },
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
})

const User = mongoose.model('User', userSchema)
module.exports = { User };