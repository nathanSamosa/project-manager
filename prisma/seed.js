/* eslint-disable no-undef */
const { prisma } = require('../src/server/utils/prisma');

async function seed() {
    const user = await createUser()
    console.log("createUser", user)
    // const project = await createProject(user)
    // await createTickets(project)
    // await createKanban(project)
    process.exit(0);
}

const createUser = async() => {
    
    const user = await prisma.user.create({
        data: {
            name: "Nathan",
            email: "nathanthesamosa@gmail.com",
            password: "123123"
        }
    })
    // console.log("createUser", user)
    return user
}

// const createProject = async(user) => {
//     const project = {user}
//     console.log("createProject", project)
// }

// const createTickets = async(project) => {
//     const tickets = {project}
//     console.log("createTickets", tickets)
// }

// const createKanban = async(project) => {
//     const kanban = {project}
//     console.log("createKanban", kanban)
// }

seed()
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
    })
    .finally(() => process.exit(1));