const router = require('express').Router();
const { authMiddleware } = require('../middleware/authentication');
const { createUrl, deleteUrl, clickUrl } = require('../controller/url-controller');
const Validation = require('../utils/validation');

router.post('/create', authMiddleware, Validation.validateUrlForm, createUrl);
router.delete('/delete/:id', authMiddleware, deleteUrl);
router.post('/click', Validation.validateClickUrlForm, clickUrl);


module.exports = router;

