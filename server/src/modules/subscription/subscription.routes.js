const express = require('express');
const router = express.Router();
const { authenticate } = require('../../middlewares/auth.middleware');
const { body } = require('express-validator');
const { validateRequest } = require('../../middlewares/validator');
const subscriptionController = require('./subscription.controller');

router.post('/subscribe',
    authenticate,
    [
        body('plan').trim().isIn(['pro', 'enterprise']).notEmpty()
            .withMessage('Valid plan is required'),
        body('period').trim().isIn(['monthly', 'yearly']).notEmpty()
            .withMessage('Valid billing period is required'),
        validateRequest
    ],
    subscriptionController.subscribe
);

router.post('/cancel', authenticate, subscriptionController.cancelSubscription);

module.exports = router;