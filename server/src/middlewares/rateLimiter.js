const { getRedisClient } = require('../config/redis');
const handleError = require('../utils/handleError');
const logger = require('../utils/logger');
const sendResponse = require('../utils/sendResponse');

const WINDOW_SIZE = 60;
const MAX_REQUESTS = 15;

exports.rateLimiter = handleError(async(req, res, next) => {
    const redisClient = getRedisClient();
    const ip = req.ip;
    const key = `rate_limit:${ip}`;

    const current = await redisClient.incr(key);

    if(current === 1){
        await redisClient.expire(key, WINDOW_SIZE);
    }

    if(current > MAX_REQUESTS){
        logger.warn(`Rate limit exceeded for IP: ${ip}`);
        return sendResponse(res, 429, false, 'Too many requests. Please try again later.')
    }

    next();
}, 'Rate limiting failed');