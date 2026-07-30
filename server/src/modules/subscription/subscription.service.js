const crypto = require('crypto');
const { createRazorpayInstance } = require('../../config/payment');
const { PLAN_LIMITS } = require('../../config/plan');
const { RAZORPAY_KEY_SECRET, RAZORPAY_KEY_ID } = require('../../config/env');
const Payment = require('../../models/payment');
const Subscription = require('../../models/subscription');

let razorpayInstance;

const getRazorpayInstance = () => {
  if (!razorpayInstance) {
    razorpayInstance = createRazorpayInstance();
  }
  return razorpayInstance;
};

exports.createOrder = async ({ user, plan }) => {
  if (!PLAN_LIMITS[plan]) {
    throw { text: 'Invalid plan selected', code: 400 };
  }

  if (user.subscriptionStatus === 'active' && user.plan === plan) {
    throw { text: 'You are already subscribed to this plan', code: 400 };
  }

  const razorpay = getRazorpayInstance();
  const options = {
    amount: PLAN_LIMITS[plan].price * 100,
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
    notes: { plan }
  };

  const order = await razorpay.orders.create(options);

  await Payment.create({
    user: user._id,
    paymentProvider: 'razorpay',
    orderId: order.id,
    plan,
    amount: PLAN_LIMITS[plan].price,
    currency: 'INR',
    status: 'created'
  });

  return { ...order, key_id: RAZORPAY_KEY_ID };
};

exports.verifyOrder = async ({ user, orderId, paymentId, signature }) => {
  const hmac = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET);
  hmac.update(orderId + '|' + paymentId);
  const generatedSignature = hmac.digest('hex');

  if (generatedSignature !== signature) {
    throw { text: 'Invalid payment signature', code: 400 };
  }

  const razorpay = getRazorpayInstance();
  const order = await razorpay.orders.fetch(orderId);
  if (!order) {
    throw { text: 'Order not found', code: 404 };
  }

  const payment = await Payment.findOne({ orderId });
  if (!payment) {
    throw { text: 'Payment record not found', code: 404 };
  }

  if (payment.status === 'verified') {
    throw { text: 'Order has already been verified', code: 400 };
  }

  if (order.status !== 'paid') {
    throw { text: 'Payment not completed for this order', code: 400 };
  }

  payment.paymentId = paymentId;
  payment.signature = signature;
  payment.status = 'verified';
  await payment.save();

  const now = new Date();
  const endDate = new Date();
  endDate.setDate(now.getDate() + 30);

  const plan = payment.plan;

  await Subscription.findOneAndUpdate(
    { user: user._id },
    {
      user: user._id,
      plan,
      status: 'active',
      currentPeriodStart: now,
      currentPeriodEnd: endDate
    },
    { upsert: true, new: true }
  );

  user.plan = plan;
  user.subscriptionStatus = 'active';
  await user.save();

  return { plan, validTill: endDate };
};

exports.cancelSubscription = async ({ user }) => {
  if (user.subscriptionStatus !== 'active') {
    throw { text: 'You do not have an active subscription to cancel', code: 400 };
  }

  user.plan = 'free';
  user.subscriptionStatus = 'canceled';
  await user.save();

  const sub = await Subscription.findOneAndUpdate(
    { user: user._id, status: 'active' },
    { status: 'canceled' },
    { new: true }
  );

  if (!sub) {
    throw { text: 'No active subscription record found', code: 404 };
  }
};
