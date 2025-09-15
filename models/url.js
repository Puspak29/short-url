const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    originalUrl: {
        type: String,
        required: true
    },
    visitHistory: [{
        timeStamp: {
            type: Number
        }
    }],
},
{
    timestamps: true
});

const URL = mongoose.model('url', urlSchema);

module.exports = URL;