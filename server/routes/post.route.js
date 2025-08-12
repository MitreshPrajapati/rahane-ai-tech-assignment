const { Router } = require("express");
const { authentication } = require("../middlewares/authentication.middleware");
const { authorization } = require("../middlewares/authorization.middleware");
const { getAllPosts, createPost, updatePost, deletePost } = require("../controllers/post.controller");

const postRouter = Router();

// getAll posts
postRouter.get('/', authentication, authorization(['admin']), getAllPosts)

// get post
//  postRouter.get()

// create post 
postRouter.post('/create', authentication, authorization(['admin', 'editor']), createPost);

// update post
postRouter.put('/:id', authentication, authorization(['admin', 'editor']), updatePost);

// delete post
postRouter.delete('/:id', authentication, authorization(['admin', 'editor']), deletePost)


module.exports = { postRouter };
