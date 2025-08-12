const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    post: { type: mongoose.Types.ObjectId, ref: "Post", required: true },
    author: { type: mongoose.Types.ObjectId, ref: "User", required: true },

}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
})

const Comment = mongoose.model('comment', commentSchema);
module.exports = { Comment };