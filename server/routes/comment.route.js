const { Router } = require("express");
const { authentication } = require("../middlewares/authentication.middleware");
const { authorization } = require("../middlewares/authorization.middleware");
const { createComment, deleteComment, getPostComments } = require("../controllers/comment.controller");

const commentRouter = Router();

commentRouter.post('/:postId', authentication, authorization(['admin', 'editor', 'viewer']), createComment);
commentRouter.get('/:postId', authentication, getPostComments)
commentRouter.delete('/:id', authentication, authorization(['admin', 'editor']), deleteComment);

module.exports = { commentRouter };