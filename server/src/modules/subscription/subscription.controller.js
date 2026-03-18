const handleError = require("../../utils/handleError");
const sendResponse = require("../../utils/sendResponse");

exports.subscribe = handleError(async(req, res) => {
    const user = req.user;
    const { plan,  period } = req.body;

    if(user.plan === 'pro' || user.plan === 'enterprise') {
        return sendResponse(res, 400, false, 'You are already subscribed to a plan');
    }

    // TODO: Integrate payment provider (Razorpay) to create subscription and get subscription details
}, 'Failed to subscribe to plan');

exports.cancelSubscription = handleError(async(req, res) => {
    const user = req.user;
    if(user.plan === 'free') {
        return sendResponse(res, 400, false, 'You do not have an active subscription to cancel');
    }

    user.plan = 'free';
    user.subscriptionStatus = 'canceled';

    await user.save();

    return sendResponse(res, 200, true, 'Subscription canceled successfully');
}, 'Failed to cancel plan');