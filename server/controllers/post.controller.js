const { Post } = require("../models/Posts")
const { STATUS_CODES } = require("../utils/httpStatus")

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'email').sort({ createdAt: -1 });
        res.status(STATUS_CODES.OK).json(posts);
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Server error' })
    }
}

// const getPost = async (req, res) => {
//     try {

//     } catch (error) {
//         res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Server error' })
//     }
// }

const createPost = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user._id;
    try {
        const post = await Post.create({
            title,
            description,
            author: userId
        });

        res.status(STATUS_CODES.CREATED).json({ message: 'Posted', post })
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Server error' })
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (!post) {
            res.status(STATUS_CODES.NOT_FOUND).json({ message: "Post not found." });

        }

        // role not admin 
        // and author and req.user._id not match then not allowed
        if (!req.user.roles.includes('admin') && post.author.toString() !== req.user._id.toString()) {
            return res.status(STATUS_CODES.FORBIDDEN).json({ message: "Not allowed." });
        }

        title && (post.title = title);
        content && (post.content = content);
        await post.save();
        res.status(STATUS_CODES.OK).json({ message: 'Post updated.', post });
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Server error' })
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(STATUS_CODES.NOT_FOUND).json({ message: "Post not found." });
        }

        if (req.user.roles.includes('admin') && post.author.toString() !== req.user._id.toString()) {
            return res.status(STATUS_CODES.FORBIDDEN).json({ message: 'Not allowed.' })
        }

        await post.deleteOne();
        res.send({ message: "Post Deleted" })
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Server error' })
    }
}

module.exports = {
    createPost,
    updatePost,
    deletePost,
    // getPost,
    getAllPosts,
}