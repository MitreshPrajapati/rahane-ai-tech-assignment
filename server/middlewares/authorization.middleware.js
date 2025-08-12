const { STATUS_CODES } = require("../utils/httpStatus")

const authorization = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(STATUS_CODES.FORBIDDEN).json({ message: 'Not authenticated' });
        }

        // if any one role match then true else flse
        const hasRole = req.user.roles.some(role => allowedRoles.includes(role));

        if (!hasRole) {
            return res.status(STATUS_CODES.FORBIDDEN).json({ message: 'Not permitted.' })
        }
        
        next();

    }
}

module.exports = { authorization }