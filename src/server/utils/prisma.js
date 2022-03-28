const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');

module.exports = {
    prisma,
    bcrypt
};