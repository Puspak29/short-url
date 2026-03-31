const { REDIS_URL } = require('./env');
const { createClient } = require('redis');
const logger = require('../utils/logger');

let redisClient;

const connectRedis = async() => {
    try{
        redisClient = createClient({
            url: REDIS_URL
        });

        redisClient.on('error', (err) => {
            logger.error('Redis Client Error', err);
        });

        await redisClient.connect();
        logger.info('Redis connected successfully');
    }
    catch(err){
        logger.error('Error connecting to Redis:', err);
        process.exit(1);
    }
}

const getRedisClient = () => {
    if(!redisClient){
        throw new Error('Redis client not initialized. Call connectRedis first.');
    }
    return redisClient;
}

module.exports = {
    connectRedis,
    getRedisClient
}