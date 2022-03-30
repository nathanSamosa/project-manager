const express = require('express');
const passport = require('passport');

const {
    createProject,
    getProjectById
} = require('../controllers/project');

require('../utils/passport')
const router = express.Router();

router.post('/create', passport.authenticate('jwt', { session: false }), createProject)
router.get('/', passport.authenticate('jwt', { session: false }), getProjectById);

module.exports = router;