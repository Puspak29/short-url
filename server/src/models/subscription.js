const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },

    paymentProvider: {
        type: String,
        enum: ['stripe', 'razorpay', 'none'],
        default: 'none'
    },

    paymentProviderSubscriptionId: {
        type: String,
        default: null
    },
    plan: {
        type: String,
        enum: ['free', 'pro', 'enterprise'],
        default: 'free'
    },
    status: {
        type: String,
        enum: ['active', 'canceled', 'past_due', 'unpaid'],
        default: 'active'
    },
    currentPeriodEnd: {
        type: Date,
    }

},{
    timestamps: true
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;