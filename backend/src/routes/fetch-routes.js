const router = require('express').Router();
const {fetchLikes} = require('../controller/fetch-controller');   
const {authMiddleware} = require('../middleware/authentication');

router.get('/likes',  fetchLikes);

module.exports = router;