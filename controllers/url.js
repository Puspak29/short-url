const shortid = require('shortid');
const URL = require('../models/url');
require('dotenv').config();

const backendUrl = process.env.BACKEND_URL;

async function generateShortId(req, res){
    const body = req.body;
    if(!body) return res.status(400).json({message: 'No data provided'});
    const shortId = shortid.generate();

    if(!body.url.startsWith('http')){
        body.url = 'https://' + body.url;
    }

    await URL.create({
        shortUrl: shortId,
        originalUrl: body.url,
        visitHistory: []
    });

    return res.status(201).json({
        shortUrl: `${backendUrl}/${shortId}`,
    });
}

module.exports = {
    generateShortId
}