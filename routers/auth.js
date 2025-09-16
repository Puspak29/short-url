const express = require('express');
const {login, logout, register} = require('../controllers/auth');
const middleWare = require('../middleware');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logout', middleWare, logout);

module.exports = router;