const handleError = require('../../utils/handleError');
const sendResponse = require('../../utils/sendResponse');
const { generateShortCode, validateShortCode } = require('../../utils/shortId');
const URL = require('../../models/url');
const User = require('../../models/user');
const { FRONTEND_URL } = require('../../config/env');
const { normalizeAndValidateUrl } = require('../../utils/urlValidator');
const Click = require('../../models/click');
const UAParser = require('ua-parser-js');
const geoip = require('geoip-lite');
const urlStatsService = require('./url.stats.service');

exports.createShortUrl = handleError(async (req, res) => {
    const { inputUrl, isCustom, customShortCode } = req.body;
    const user = req.user;

    if(!inputUrl){
        return sendResponse(res, 400, false, 'Input URL is required');
    }
    const originalUrl = normalizeAndValidateUrl(inputUrl);
    if(!originalUrl){
        return sendResponse(res, 400, false, 'Invalid URL format');
    }
    if(isCustom && !customShortCode){
        return sendResponse(res, 400, false, 'Custom short code is required for custom URLs');
    }
    
    let shortCode;
    let customCode = customShortCode;
    if(isCustom){
        customCode = customCode.trim();
        if(!validateShortCode(customCode)){
            return sendResponse(res, 400, false, 'Custom short code contains invalid characters');
        }

        const existingCustomUrl = await URL.findOne({ shortUrl: customCode });
        if(existingCustomUrl){
            return sendResponse(res, 400, false, 'Custom short code is already in use');
        }
        shortCode = customCode;
    }
    else{
        let isUnique = false;
        while(!isUnique){
            shortCode = generateShortCode();
            const existingUrl = await URL.findOne({ shortUrl: shortCode });
            if(!existingUrl){
                isUnique = true;
            }
        }
    }

    await URL.create({
        shortUrl: shortCode,
        originalUrl,
        isCustom: isCustom ? true : false,
        user: user._id
    });

    const updatedData = {
        $inc: {
            monthlyUrlCount: 1
        }
    }
    if(isCustom){
        updatedData.$inc.lifetimeCustomCount = 1;
    }
    
    await User.findByIdAndUpdate(user._id, updatedData);

    sendResponse(res, 201, true, 'Short URL created successfully', {
        shortUrl: `${FRONTEND_URL}/${shortCode}`,
        originalUrl: originalUrl,

    })
}, 'Failed to create short URL');

exports.redirectToOriginalUrl = handleError(async (req, res) => {
    const { shortCode } = req.params;
    const urlEntry = await URL.findOne({ shortUrl: shortCode, isActive: true });
    if(!urlEntry){
        return sendResponse(res, 404, false, 'Short URL not found');
    }
    await URL.findByIdAndUpdate(
        urlEntry._id,
        { $inc: { clicks: 1 } }
    );

    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.connection.remoteAddress;

    const parser = new UAParser(req.headers['user-agent']);
    const uaResult = parser.getResult();
    
    const referrer = req.get('referer') || 'unknown';
    const geo = geoip.lookup(ip);

    await Click.create({
        url: urlEntry._id,
        ip,
        country: geo?.country || 'unknown',
        city: geo?.city || 'unknown',
        device: uaResult.device.type || 'unknown',
        browser: uaResult.browser.name || 'unknown',
        os: uaResult.os.name || 'unknown',
        referrer
    })
    return res.redirect(urlEntry.originalUrl);
}, 'Failed to redirect to original URL');

exports.deleteUrl = handleError(async(req, res) => {
    const { id } = req.params;
    const user = req.user;
    const urlEntry = await URL.findOne({ _id: id, user: user._id });
    if(!urlEntry){
        return sendResponse(res, 404, false, 'URL not found');
    }

    const updatedData = {
        $inc: {
            monthlyUrlCount: -1
        }
    }
    if(urlEntry.isCustom){
        updatedData.$inc.lifetimeCustomCount = -1;
    }

    await Click.deleteMany({ url: urlEntry._id });
    await URL.findByIdAndDelete(id);
    await User.findByIdAndUpdate(user._id, updatedData);

    sendResponse(res, 200, true, 'URL deleted successfully');

}, 'Failed to delete URL');

exports.disableUrl = handleError(async(req, res) => {
    const { id } = req.params;
    const user = req.user;
    const urlEntry = await URL.findOne({ _id: id, user: user._id });
    if(!urlEntry){
        return sendResponse(res, 404, false, 'URL not found');
    }
    urlEntry.isActive = false;
    await urlEntry.save();

    sendResponse(res, 200, true, 'URL disabled successfully');
}, 'Failed to disable URL');

exports.getAllUrls = handleError(async(req, res) => {
    const user = req.user;
    const { page = 1, limit = 10 } = req.params;
    const urls = await URL.find({ user: user._id }).sort({ createdAt: -1 }).select('-clicks -user').limit(limit * 1).skip((page - 1) * limit);

    sendResponse(res, 200, true, 'URLs retrieved successfully', { urls });
}, 'Failed to get URLs');

exports.getAllStats = handleError(async(req, res) => {
    const user = req.user;
    const urls = await URL.find({ user: user._id }).select('_id');
    const urlIds = urls.map(url => url._id);

    if(urlIds.length === 0){
        return sendResponse(res, 200, true, 'No data available', { stats });
    }
    
    const stats = await urlStatsService.generateUrlStats({ $in: urlIds }, user.plan);

    return sendResponse(res, 200, true, 'Stats retrieved successfully', { stats });
}, 'Failed to get stats');

exports.getUrlStats = handleError(async(req, res) => {
    const user = req.user;
    const { id } = req.params;
    const urlEntry = await URL.findOne({ _id: id, user: user._id });

    if(!urlEntry){
        return sendResponse(res, 404, false, 'URL not found');
    }

    const stats = await urlStatsService.generateUrlStats(urlEntry._id, user.plan);
    
    return sendResponse(res, 200, true, 'Stats retrieved successfully', { stats });
}, 'Failed to get URL stats');