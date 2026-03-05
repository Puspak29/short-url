const express = require('express');
const router = express.Router();
const urlController = require('./url.controller');
const planMiddlewate = require('../../middlewares/plan.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');
const { body } = require('express-validator');
const { validateRequest } = require('../../middlewares/validator');

router.post('/create', 
    [
        body('inputUrl').trim().notEmpty()
            .withMessage('Input URL is required'),
        body('isCustom').optional().isBoolean()
            .withMessage('isCustom must be a boolean'),
        validateRequest
    ], 
    authMiddleware.authenticate, planMiddlewate.planCheck, urlController.createShortUrl);
router.get('/get/all', authMiddleware.authenticate, urlController.getAllUrls);
router.get('/stats/all', authMiddleware.authenticate, urlController.getAllStats);
router.get('/:shortCode', urlController.redirectToOriginalUrl);
router.delete('/:id', authMiddleware.authenticate, urlController.deleteUrl);

module.exports = router;