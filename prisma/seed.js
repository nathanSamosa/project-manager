/* eslint-disable no-undef */
const { prisma } = require('../src/server/utils/prisma');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function seed() {
    const user = await createUser()
    console.log("createUser", user)
    // const project = await createProject(user)
    // await createTickets(project)
    // await createKanban(project)
    process.exit(0);
}

const createUser = async() => {
    const password = "123123"
    const hash = await bcrypt.hash(password, saltRounds);
    
    const user = await prisma.user.create({
        data: {
            name: "Nathan",
            email: "nathanthesamosa@gmail.com",
            password: hash
        }
    })
    return user
}

seed()
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
    })
    .finally(() => process.exit(1));