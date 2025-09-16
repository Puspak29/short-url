const express = require('express');
const urlRouter = require('./url');
const redirectUrlRouter = require('./redirectUrl');
const allUrlsRouter = require('./allUrls');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the URL Shortener Service');
});
router.use('/generate', urlRouter);
router.use('/allurls', allUrlsRouter);
router.use('/', redirectUrlRouter);

module.exports = router;