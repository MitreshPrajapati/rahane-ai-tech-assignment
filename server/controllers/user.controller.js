const { User } = require("../models/User")
const { STATUS_CODES } = require("../utils/httpStatus")

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').lean();
        res.status(STATUS_CODES.OK).json(users);
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Server error' })
    }
}

const userProfile = async (req, res) => {
    const { id } = req.user;
    try {
        const user = await User.findById(id).select('-password');
        res.status(STATUS_CODES.OK).json(user)
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Server error' })
    }
}

const updateUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.query;
    try {
        if (!['admin', 'editor', 'viewer'].includes(role)) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: "Invalid role." })
        }
        const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
        res.status(STATUS_CODES.OK).json(user);
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Server error' })
    }
}


const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(STATUS_CODES.OK).json({ message: 'Deleted' });
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Server error' })
    }
}



module.exports = {
    getAllUsers,
    userProfile,
    updateUserRole,
    deleteUser,
}