const { Comment } = require("../models/Comments");
const { Post } = require("../models/Posts");
const { STATUS_CODES } = require("../utils/httpStatus")


const createComment = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user.id;
    const { text, } = req.body;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(STATUS_CODES.NOT_FOUND).json({ message: "Post not found." })
        }

        const commnet = await Comment.create({
            text,
            post: post._id,
            author: userId
        })

        res.status(STATUS_CODES.CREATED).json({ message: "Comment added." })
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Server error." })
    }
}


const getPostComments = async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await Comment.find({ post: postId }).populate("author", "email")
        res.status(STATUS_CODES.OK).json(comments);
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Server error." })
    }
}

const deleteComment = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(STATUS_CODES.NOT_FOUND).json({ message: "Not found." });
        }

        // if (!req.user.roles.includes('admin') || !req.user.roles.includes('editor') ) {
        //     return res.status(STATUS_CODES.FORBIDDEN).json({ message: "Not allowed" })
        // }

        await comment.deleteOne();
        res.status(STATUS_CODES.OK).json({ message: "comment deleted." })
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Server error." })
    }
}

// const updateComment = async (req, res) => {
//     try {

//     } catch (error) {
//         res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Server error." })
//     }
// }

module.exports = {
    createComment,
    getPostComments,
    deleteComment,
}