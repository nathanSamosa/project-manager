const express = require('express');
const passport = require('passport');

const {
    createItem,
    updateItem,
    updateItemDetails,
    deleteItem
} = require('../controllers/kanban');

require('../utils/passport')
const router = express.Router();

router.post('/item', passport.authenticate('jwt', { session: false }), createItem);
router.put('/item', passport.authenticate('jwt', { session: false }), updateItem);
router.put('/itemDetails', passport.authenticate('jwt', { session: false }), updateItemDetails);
router.delete('/item', passport.authenticate('jwt', { session: false }), deleteItem);

module.exports = router;