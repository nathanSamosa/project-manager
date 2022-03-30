const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = async (password) => await bcrypt.hash(password, saltRounds);

const checkPassword = async (textPassword, hash) => await bcrypt.compare(textPassword, hash)

module.exports = {
    hashPassword,
    checkPassword,
};
