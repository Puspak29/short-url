const URL = require('../models/url');

async function getAllUrls(req, res){
    try {
        const urls = await URL.find({});
        res.status(200).json(urls);
    }
    catch(err){
        res.status(500).json({message: "Server Error"});
    }
}

module.exports = {
    getAllUrls,
}