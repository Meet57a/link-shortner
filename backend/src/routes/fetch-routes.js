const router = require('express').Router();
const { authMiddleware } = require('../middleware/authentication');
const { fetchLikes, fetchUrl,getLongUrl } = require('../controller/fetch-controller');

router.get('/likes', fetchLikes);
router.get('/url', authMiddleware, fetchUrl);
router.get('/getLong/:shortUrl', getLongUrl);


module.exports = router;