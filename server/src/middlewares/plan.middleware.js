const handleError = require("../utils/handleError");
const sendResponse = require("../utils/sendResponse");
const { PLAN_LIMITS } = require('../config/plan');
const logger = require('../utils/logger');

exports.planCheck = handleError(async (req, res, next) => {
    const user = req.user;
    const now = new Date();
    const { isCustom } = req.body;

    let shouldSaveUser = false;
    if(!user.monthlyResetDate || user.monthlyResetDate < now){
        user.monthlyUrlCount = 0;

        const nextResetDate = new Date(now);
        nextResetDate.setMonth(nextResetDate.getMonth() + 1);
        user.monthlyResetDate = nextResetDate;
        shouldSaveUser = true;
    }

    const limits = PLAN_LIMITS[user.plan];
    if(!limits){
        logger.error(`Plan limits not defined`, { plan : user.plan });
        return sendResponse(res, 500, false, 'Plan limits not configured');
    }
    if(user.monthlyUrlCount >= limits.monthlyUrlLimit){
        return sendResponse(res, 403, false, 'Monthly URL creation limit reached for your plan');
    }
    if(isCustom && user.lifetimeCustomCount >= limits.lifetimeCustomLimit){
        return sendResponse(res, 403, false, 'Lifetime custom URL creation limit reached for your plan');
    }
    if(shouldSaveUser){
        await user.save();
    }
    next();
}, 'Plan check failed');