const express = require('express');
const router = express.Router();
const { authenticate } = require('../../middlewares/auth.middleware');
const { body } = require('express-validator');
const { validateRequest } = require('../../middlewares/validator');
const subscriptionController = require('./subscription.controller');

router.post('/create-order',
    authenticate,
    [
        body('plan').trim().isIn(['pro', 'enterprise']).notEmpty()
            .withMessage('Valid plan is required (pro or enterprise)'),
        validateRequest
    ],
    subscriptionController.createOrder
);

router.post('/cancel', authenticate, subscriptionController.cancelSubscription);

router.post('/verify-order', authenticate, 
    [
        body('orderId').trim().notEmpty().withMessage('Order ID is required'),
        body('paymentId').trim().notEmpty().withMessage('Payment ID is required'),
        body('signature').trim().notEmpty().withMessage('Signature is required'),
        validateRequest
    ],
    subscriptionController.verifyOrder);

module.exports = router;