const express = require('express');
const passport = require('passport');

const {
    createProject,
    getProjectById,
    getSingleProject
} = require('../controllers/project');

require('../utils/passport')
const router = express.Router();

router.post('/create', passport.authenticate('jwt', { session: false }), createProject);
router.get('/', passport.authenticate('jwt', { session: false }), getProjectById);
router.get('/:id', passport.authenticate('jwt', { session: false }), getSingleProject);

module.exports = router;