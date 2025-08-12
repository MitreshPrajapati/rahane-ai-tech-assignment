const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { STATUS_CODES } = require('../utils/httpStatus');

dotenv.config();

const authentication = (req, res, next) => {
    // console.log("req headers:", req.headers)
    try {
        const authHeader = req?.headers?.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Authorization token missing or invalid format." })
        }


        const token = authHeader.split(' ')[1];

        if (!req.body) {
            //  if body is undefined
            req.body = {};
        }
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        return res
            .status(STATUS_CODES.UNAUTHORIZED)
            .json({ message: "Invalid or expired token." });
    }
};

module.exports = { authentication };
