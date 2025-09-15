const express = require('express');
const { redirectUrl } = require('../controllers/redirectUrl');

const router = express.Router();

router.get('/:shortId', redirectUrl);

module.exports = router;