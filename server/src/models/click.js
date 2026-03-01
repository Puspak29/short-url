const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
    url: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Url',
        required: true,
        index: true
    },

    ip: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    device: {
        type: String
    },
    browser: {
        type: String
    },
    os: {
        type: String
    },
    referrer: {
        type: String
    }
},{
    timestamps: true
});

clickSchema.index({ url: 1, createdAt: -1 });
clickSchema.index({ country: 1 });
clickSchema.index({ device: 1 });

const Click = mongoose.model('Click', clickSchema);

module.exports = Click;