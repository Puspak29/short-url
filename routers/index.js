const express = require('express');
const urlRouter = require('./url');
const redirectUrlRouter = require('./redirectUrl');
const allUrlsRouter = require('./allUrls');
const authRouter = require('./auth');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the URL Shortener Service');
});
router.use('/generate', urlRouter);
router.use('/allurls', allUrlsRouter);
router.use('/auth', authRouter);
router.use('/', redirectUrlRouter);

module.exports = router;