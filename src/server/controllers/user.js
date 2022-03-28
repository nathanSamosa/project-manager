const { prisma } = require('../utils/prisma');
const { checkPassword } = require('../utils/bcrypt');
const { loginSchema } = require('../utils/joi');
const { createToken } = require('../utils/jwt');

const { HTTP_RESPONSE } = require('../config');

const authenticateUser = async (req, res) => {
    console.log('authenticateUser', req.body)

    const { error } = loginSchema.validate(req.body);
    if (error) { 
        return res.status(HTTP_RESPONSE.BAD_REQUEST.CODE).json({ error: error.details[0] });
    }

    const { email, password } = req.body;

    try {
        let selectedUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!selectedUser)
            return res.status(HTTP_RESPONSE.UNAUTHORIZED.CODE).json({ error: HTTP_RESPONSE.UNAUTHORIZED.MESSAGE });

        const checkedPassword = checkPassword(selectedUser.password, password);

        if (!checkedPassword)
            return res.status(HTTP_RESPONSE.UNAUTHORIZED.CODE).json({ error: HTTP_RESPONSE.UNAUTHORIZED.MESSAGE });

        delete selectedUser.password;

        const token = `Bearer ${createToken(selectedUser.id)}`;

        return res.status(HTTP_RESPONSE.CREATED.CODE).json({ data: selectedUser, token: token });
    } catch (error) {
        console.log(error);
        return res.status(HTTP_RESPONSE.INTERNAL.CODE).json({ error: HTTP_RESPONSE.INTERNAL.MESSAGE });
    }
}

const getUserFromJWT = (req, res) => {
    let {user} = req;

    delete user.password;

    res.json({ data: user });
}

module.exports = {
    authenticateUser,
    getUserFromJWT
};