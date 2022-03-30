const express = require('express');
const passport = require('passport');

const {
    createUser,
    authenticateUser,
    getUserFromJWT
} = require('../controllers/user');

require('../utils/passport')
const router = express.Router();

router.post('/register', createUser)
router.post('/login', authenticateUser);
router.get('/get', passport.authenticate('jwt', { session: false }), getUserFromJWT);

module.exports = router;