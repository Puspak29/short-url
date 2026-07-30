const handleError = require("../../utils/handleError");
const sendResponse = require("../../utils/sendResponse");
const subscriptionService = require('./subscription.service');

exports.createOrder = handleError(async (req, res) => {
  const { plan } = req.body;
  const order = await subscriptionService.createOrder({ user: req.user, plan });
  return sendResponse(res, 200, true, 'Order created successfully', { order });
}, 'Failed to create order');

exports.verifyOrder = handleError(async (req, res) => {
  const { orderId, paymentId, signature } = req.body;
  const result = await subscriptionService.verifyOrder({ user: req.user, orderId, paymentId, signature });
  return sendResponse(res, 200, true, 'Order verified successfully', {
    plan: result.plan,
    validTill: result.validTill
  });
}, 'Failed to verify order');

exports.cancelSubscription = handleError(async (req, res) => {
  await subscriptionService.cancelSubscription({ user: req.user });
  return sendResponse(res, 200, true, 'Subscription canceled successfully');
}, 'Failed to cancel subscription');
