const jwt = require('jsonwebtoken');

const { SECRET } = require('../config');

const createToken = (payload) => jwt.sign(payload, SECRET);

module.exports = {
    createToken,
};
