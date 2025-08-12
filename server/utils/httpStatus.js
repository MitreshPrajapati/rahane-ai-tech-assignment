const STATUS_CODES = {
    OK: 200, // Request succeeded
    CREATED: 201, // Resource created successfully
    BAD_REQUEST: 400, // Invalid request data
    UNAUTHORIZED: 401, // No authentication provided / invalid token
    FORBIDDEN: 403, // Authenticated but no permission
    NOT_FOUND: 404, // Resource not found
    INTERNAL_SERVER_ERROR: 500, // General server error
};

module.exports = { STATUS_CODES }
