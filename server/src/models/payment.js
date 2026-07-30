const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
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
    orderId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    paymentId: {
        type: String,
        default: null
    },
    signature: {
        type: String,
        default: null
    },
    plan: {
        type: String,
        enum: ['pro', 'enterprise'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        enum: ['INR', 'USD', 'EUR'],
        default: 'INR'
    },
    status: {
        type: String,
        enum: ['created', 'verified', 'failed'],
        default: 'created'
    },
    failureReason: {
        type: String,
        default: null
    }
},{
    timestamps: true
});


const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;