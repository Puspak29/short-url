const crypto = require('crypto');

jest.mock('razorpay', () => {
  const mockCreate = jest.fn();
  const mockFetch = jest.fn();
  return jest.fn().mockImplementation(() => ({
    orders: { create: mockCreate, fetch: mockFetch }
  }));
});

const razorpay = require('razorpay');
const request = require('supertest');
const app = require('../../src/app');
const { createUser } = require('../factories/user.factory');
const { generateToken } = require('../../src/utils/jwt');
const Subscription = require('../../src/models/subscription');
const Payment = require('../../src/models/payment');

const mockOrdersCreate = razorpay().orders.create;
const mockOrdersFetch = razorpay().orders.fetch;

describe('Subscription Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/subscription/create-order', () => {
    test('should create a new order for pro plan', async () => {
      const user = await createUser({ plan: 'free', subscriptionStatus: 'none' });
      const token = generateToken({ id: user._id });

      mockOrdersCreate.mockResolvedValue({
        id: 'order_test123',
        amount: 8900,
        currency: 'INR',
        receipt: 'receipt_123',
        notes: { plan: 'pro' }
      });

      const res = await request(app)
        .post('/api/subscription/create-order')
        .set('Authorization', `Bearer ${token}`)
        .send({ plan: 'pro' });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.order.id).toBe('order_test123');

      const payment = await Payment.findOne({ orderId: 'order_test123' });
      expect(payment).not.toBeNull();
      expect(payment.plan).toBe('pro');
      expect(payment.status).toBe('created');
    });

    test('should return 400 when already subscribed to same plan', async () => {
      const user = await createUser({ plan: 'pro', subscriptionStatus: 'active' });
      const token = generateToken({ id: user._id });

      const res = await request(app)
        .post('/api/subscription/create-order')
        .set('Authorization', `Bearer ${token}`)
        .send({ plan: 'pro' });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('You are already subscribed to this plan');
    });

    test('should return 400 for invalid plan', async () => {
      const user = await createUser({ plan: 'free', subscriptionStatus: 'none' });
      const token = generateToken({ id: user._id });

      const res = await request(app)
        .post('/api/subscription/create-order')
        .set('Authorization', `Bearer ${token}`)
        .send({ plan: 'invalid' });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    test('should return 401 without auth', async () => {
      const res = await request(app)
        .post('/api/subscription/create-order')
        .send({ plan: 'pro' });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('POST /api/subscription/verify-order', () => {
    test('should verify a valid payment', async () => {
      const user = await createUser({ plan: 'free', subscriptionStatus: 'none' });
      const token = generateToken({ id: user._id });

      await Payment.create({
        user: user._id,
        paymentProvider: 'razorpay',
        orderId: 'order_verify123',
        plan: 'pro',
        amount: 89,
        currency: 'INR',
        status: 'created'
      });

      mockOrdersFetch.mockResolvedValue({
        id: 'order_verify123',
        status: 'paid',
        notes: { plan: 'pro' }
      });

      const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
      hmac.update('order_verify123|pay_test123');
      const signature = hmac.digest('hex');

      const res = await request(app)
        .post('/api/subscription/verify-order')
        .set('Authorization', `Bearer ${token}`)
        .send({
          orderId: 'order_verify123',
          paymentId: 'pay_test123',
          signature
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.plan).toBe('pro');

      const subscription = await Subscription.findOne({ user: user._id });
      expect(subscription).not.toBeNull();
      expect(subscription.status).toBe('active');
      expect(subscription.plan).toBe('pro');

      const updatedUser = await (require('../../src/models/user')).findById(user._id);
      expect(updatedUser.plan).toBe('pro');
      expect(updatedUser.subscriptionStatus).toBe('active');
    });

    test('should reject invalid signature', async () => {
      const user = await createUser({ plan: 'free', subscriptionStatus: 'none' });
      const token = generateToken({ id: user._id });

      const res = await request(app)
        .post('/api/subscription/verify-order')
        .set('Authorization', `Bearer ${token}`)
        .send({
          orderId: 'order_test',
          paymentId: 'pay_test',
          signature: 'invalid_signature'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Invalid payment signature');
    });

    test('should reject already verified payment', async () => {
      const user = await createUser({ plan: 'free', subscriptionStatus: 'none' });
      const token = generateToken({ id: user._id });

      await Payment.create({
        user: user._id,
        paymentProvider: 'razorpay',
        orderId: 'order_dup',
        plan: 'pro',
        amount: 89,
        currency: 'INR',
        status: 'verified'
      });

      mockOrdersFetch.mockResolvedValue({
        id: 'order_dup',
        status: 'paid',
        notes: { plan: 'pro' }
      });

      const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
      hmac.update('order_dup|pay_dup');
      const signature = hmac.digest('hex');

      const res = await request(app)
        .post('/api/subscription/verify-order')
        .set('Authorization', `Bearer ${token}`)
        .send({
          orderId: 'order_dup',
          paymentId: 'pay_dup',
          signature
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Order has already been verified');
    });
  });

  describe('POST /api/subscription/cancel', () => {
    test('should cancel an active subscription', async () => {
      const user = await createUser({ plan: 'pro', subscriptionStatus: 'active' });
      const token = generateToken({ id: user._id });

      await Subscription.create({
        user: user._id,
        plan: 'pro',
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      });

      const res = await request(app)
        .post('/api/subscription/cancel')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);

      const updatedUser = await (require('../../src/models/user')).findById(user._id);
      expect(updatedUser.plan).toBe('free');
      expect(updatedUser.subscriptionStatus).toBe('canceled');

      const subscription = await Subscription.findOne({ user: user._id, status: 'active' });
      expect(subscription).toBeNull();
    });

    test('should return 400 when no active subscription', async () => {
      const user = await createUser({ plan: 'free', subscriptionStatus: 'none' });
      const token = generateToken({ id: user._id });

      const res = await request(app)
        .post('/api/subscription/cancel')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
