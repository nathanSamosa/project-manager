const express = require('express');
const passport = require('passport');

const {
    createProject,
    getProjectById,
    getSingleProject,
    deleteProject
} = require('../controllers/project');

require('../utils/passport')
const router = express.Router();

router.post('/create', passport.authenticate('jwt', { session: false }), createProject);
router.get('/', passport.authenticate('jwt', { session: false }), getProjectById);
router.get('/:id', passport.authenticate('jwt', { session: false }), getSingleProject);
router.delete('/', passport.authenticate('jwt', { session: false }), deleteProject);

module.exports = router;