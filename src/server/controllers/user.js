const { prisma } = require('../utils/prisma');
const { checkPassword, hashPassword } = require('../utils/bcrypt');
const { loginSchema, registerSchema } = require('../utils/joi');
const { createToken } = require('../utils/jwt');

const { HTTP_RESPONSE } = require('../config');

const createUser = async (req, res) => {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(HTTP_RESPONSE.BAD_REQUEST.CODE).json({ error: error.details[0] });

    const { name, email, password } = req.body;
    console.log('reqBody', req.body)
    const hashedPassword = await hashPassword(password);

    try {
        let createdUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        if (createdUser) {
            const token = `Bearer ${createToken(createdUser.id)}`;
            return res.status(HTTP_RESPONSE.CREATED.CODE).json({ data: createdUser, token: token });
        }
    } catch (error) {
        console.log(error);
        return res.status(HTTP_RESPONSE.INTERNAL_ERROR.CODE).json({ error: HTTP_RESPONSE.INTERNAL_ERROR.MESSAGE });
    }
}



const authenticateUser = async (req, res) => {
    console.log('authenticateUser')
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(HTTP_RESPONSE.BAD_REQUEST.CODE).json({ error: error.details[0] });

    const { email, password } = req.body;
    console.log(req.body)

    try {
        let selectedUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        console.log('selectedUser', selectedUser)

        if (!selectedUser)
            return res.status(HTTP_RESPONSE.UNAUTHORIZED.CODE).json({ error: HTTP_RESPONSE.UNAUTHORIZED.MESSAGE });

        const checkedPassword = await checkPassword(password, selectedUser.password);
        console.log('checkedPassword', checkedPassword)

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
    createUser,
    authenticateUser,
    getUserFromJWT
};