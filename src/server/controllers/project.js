const { prisma } = require('../utils/prisma');

const { HTTP_RESPONSE } = require('../config')

const createProject = async (req, res) => {
    const { title } = req.body;
    const id = req.user.id;

    const createdProject = await prisma.project.create({
        data: {
            title: title,
            user: {
                connect: {
                    id: Number(id)
                }
            }
        }
    })
    return createdProject ? res.json(HTTP_RESPONSE.OK) : res.json(HTTP_RESPONSE.UNAUTHORIZED)
}

const getProjectById = async (req, res) => {
    const id = req.user.id;
    const projects = await prisma.project.findMany({
        where: {
            userId: Number(id)
        }
    })

    return res.json({ data: projects })
}

module.exports = {
    createProject,
    getProjectById
};