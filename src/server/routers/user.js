const express = require('express');
const passport = require('passport');

const {
    authenticateUser,
    getUserFromJWT
} = require('../controllers/user');

require('../utils/passport')
const router = express.Router();

router.post('/login', authenticateUser);
router.get('/get', passport.authenticate('jwt', { session: false }), getUserFromJWT);

module.exports = router;