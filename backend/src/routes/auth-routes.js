const router = require('express').Router();
const { signUp, signIn, session, signOut, likes } = require('../controller/auth-controller');
const Validation = require('../utils/validation');
const { authMiddleware } = require('../middleware/authentication');


router.post('/sign-up', Validation.validateSignUpForm, signUp);
router.post('/sign-in', Validation.validateSignInForm, signIn);
router.get('/session', session)
router.get('/sign-out', authMiddleware, signOut);
router.get('/likes', authMiddleware, likes);

module.exports = router;