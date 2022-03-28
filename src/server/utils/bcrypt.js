const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = async (password) => bcrypt.hashSync(password, saltRounds);

const checkPassword = async (textPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(textPassword, hashedPassword);
    } catch (error) {
        return error;
    }
};

module.exports = {
    hashPassword,
    checkPassword,
};
