const URL = require('../models/url');

async function redirectUrl(req, res) {
    const shortId = req.params.shortId;
    const url = await URL.findOneAndUpdate({shortUrl: shortId},
        {
        $push: {
            visitHistory: {
                timeStamp: Date.now(),
            },
        },
    },
        { new: true }
    );

    if(!url) return res.status(404).json({message: "URL not found"});
    
    return res.redirect(url.originalUrl);
}

module.exports = {
    redirectUrl,
}