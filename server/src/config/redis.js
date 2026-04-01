const { REDIS_HOST, REDIS_PORT, REDIS_TLS, REDIS_USERNAME, REDIS_PASSWORD } = require('./env');
const { createClient } = require('redis');
const logger = require('../utils/logger');

let redisClient;

const connectRedis = async() => {
    try{
        redisClient = createClient({
            username: process.env.REDIS_USERNAME,
            password: process.env.REDIS_PASSWORD,
            socket: {
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT,
                tls: process.env.REDIS_TLS
            }

        });
        
        redisClient.on('error', (err) => {
            logger.error('Redis Client Error');
        });

        await redisClient.connect();
        logger.info('Redis connected successfully');
    }
    catch(err){
        logger.error('Error connecting to Redis:');
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