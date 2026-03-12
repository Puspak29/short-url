const sendResponse = require('./sendResponse');
const logger = require('./logger');

const handleError = (fn, errorMessage = 'Something went wrong') => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        }
        catch(error) {
            const message = error.text || errorMessage;
            logger.error(message, { error: error.stack || error });
            const statusCode = error.code || 500;
            return sendResponse(res, statusCode, false, message);
        }
    }
}

module.exports = handleError;