const express = require('express');
const urlRouter = require('./url');
const redirectUrlRouter = require('./redirectUrl');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the URL Shortener Service');
});
router.use('/url', urlRouter);
router.use('/', redirectUrlRouter);

module.exports = router;