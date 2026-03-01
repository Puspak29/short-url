const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortUrl: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    originalUrl: {
        type: String,
        required: true
    },

    // For custom URLs
    isCustom: {
        type: Boolean,
        default: false
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    clicks: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
});

urlSchema.index({ user: 1, createdAt: -1 });

const URL = mongoose.model('Url', urlSchema);

module.exports = URL;