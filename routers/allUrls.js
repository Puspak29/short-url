const express = require('express');
const { getAllUrls } = require('../controllers/allUrls');

const router = express.Router();

router.get('/', getAllUrls);

module.exports = router;