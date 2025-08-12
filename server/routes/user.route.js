const { Router } = require("express");
const { authentication } = require("../middlewares/authentication.middleware");
const { authorization } = require("../middlewares/authorization.middleware");
const { getAllUsers, updateUserRole, deleteUser, userProfile } = require("../controllers/user.controller");

const userRouter = Router();

userRouter.get('/', authentication, authorization(['admin']), getAllUsers);
userRouter.get('/me', authentication, userProfile);

userRouter.put('/:id/role', authentication, authorization(['admin']), updateUserRole);
userRouter.delete('/:id', authentication, authorization(['admin']), deleteUser);


module.exports = { userRouter }