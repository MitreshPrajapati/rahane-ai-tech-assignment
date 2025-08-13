const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { STATUS_CODES } = require('../utils/httpStatus');
const { User } = require('../models/User');
dotenv.config();


const registerUser = async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, password)
    try {
        if (!email || !password) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Missing fields." })
        }

        const isExist = await User.findOne({ email });

        if (isExist) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "This email already registerd." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        // const { password, ...rest } = user._doc;
        res.status(STATUS_CODES.CREATED).json({ message: "User register successfully.", data: { ...user._doc, password: null } });
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Server error" })
    }
}


const userLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        if (!email || !password) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "All fields required." })
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Invalid credentials." })
        }

        const isVerified = await bcrypt.compare(password, user.password);
        if (!isVerified) return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Invalid credentials." });

        const token = jwt.sign({
            id: user._id,
            email: user.email,
            roles: user.roles
        }, process.env.JWT_SECRET)

        res.status(STATUS_CODES.OK).json({ message: "Login success.", token });

    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: "Server error" })
    }
}

module.exports = {
    registerUser,
    userLogin,
}