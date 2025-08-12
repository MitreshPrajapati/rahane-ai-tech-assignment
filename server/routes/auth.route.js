const { Router } = require("express");
const { registerUser, userLogin } = require("../controllers/auth.controller");

const authRouter = Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', userLogin)

module.exports = { authRouter };