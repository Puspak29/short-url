const express = require('express');
const { generateShortId } = require('../controllers/url');
const middleWare = require('../middleware');

const router = express.Router();

router.post('/', middleWare, generateShortId);

module.exports = router;