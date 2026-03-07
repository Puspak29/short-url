const Url = require('../../src/models/url');

exports.createUrl = async(userId, overrides = {}) => {
    const url = await Url.create({
        originalUrl: 'https://www.google.com',
        shortUrl: 'test123',
        isCustom: true,
        user: userId,
        ...overrides
    })
    return url;
};