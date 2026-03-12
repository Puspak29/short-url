const { JWT_SECRET } = require('../config/env');
const handleError = require('../utils/handleError');
const sendResponse = require('../utils/sendResponse');
const User = require('../models/user');
const { verifyToken } = require('../utils/jwt');
const logger = require('../utils/logger');

exports.authenticate = handleError(async (req, res, next) => {
    if(!JWT_SECRET){
        logger.error('JWT secret is not configured');
        return sendResponse(res, 500, false, 'JWT secret is not configured');
    }
    const authHeader = req.headers['authorization'];
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return sendResponse(res, 401, false, 'Authorization header missing or malformed');
    }
    const token = authHeader.split(' ')[1];
    if(!token){
        return sendResponse(res, 401, false, 'Token missing');
    }

    const verification = verifyToken(token);
    const userId = verification.id;
    const user = await User.findById(userId);
    if(!user){
        return sendResponse(res, 401, false, 'User not found');
    }
    req.user = user;
    next();

}, 'Authentication failed');

exports.authorize = (plans) => {
    return handleError(async (req, res, next) => {
        const user = req.user;
        if(!plans.includes(user.plan)){
            return sendResponse(res, 403, false, 'Upgrade your plan to access this feature');
        }
        next();
    }, 'Authorization failed');
}