const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const { body } = require('express-validator');
const { validateRequest } = require('../../middlewares/validator');
const authMiddleware = require('../../middlewares/auth.middleware');

router.post('/register', 
    [
        body('name').trim().notEmpty().escape()
            .withMessage('Name is required'),
        body('email').trim().isEmail().normalizeEmail()
            .withMessage('Valid email is required'),
        body('password').trim().isStrongPassword({ minLength: 6, minNumbers: 1, minLowercase: 1, minUppercase: 1, minSymbols: 1 })
            .withMessage('Password must be at least 6 characters long with at least one number, one lowercase letter, one uppercase letter, and one symbol'),
        validateRequest
    ], 
    authController.register);
router.post('/login', 
    [
        body('email').trim().isEmail().normalizeEmail()
            .withMessage('Valid email is required'),
        body('password').trim().notEmpty()
            .withMessage('Password is required'),
        validateRequest
    ], 
    authController.login);

router.get('/check', authMiddleware.authenticate, authController.checkAuth);

module.exports = router;