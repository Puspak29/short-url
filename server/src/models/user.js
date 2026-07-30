const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },

    // Plan info
    plan: {
        type: String,
        enum: ['free', 'pro', 'enterprise'],
        default: 'free'
    },

    // Monthly tracking for pro and enterprise users
    monthlyUrlCount: {
        type: Number,
        default: 0
    },
    monthlyResetDate: {
        type: Date,
        required: true
    },

    // Lifetime custom tracking
    lifetimeCustomCount: {
        type: Number,
        default: 0
    },

    subscriptionStatus: {
        type: String,
        enum: ['active', 'canceled', 'past_due', 'unpaid', 'none'],
        default: 'none'
    }
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;