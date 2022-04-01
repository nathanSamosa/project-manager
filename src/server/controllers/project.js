const { prisma } = require('../utils/prisma');

const { HTTP_RESPONSE, DEFAULT_KANABN } = require('../config')

const createProject = async (req, res) => {
    const { title } = req.body;
    const id = req.user.id;

    const createdProject = await prisma.project.create({
        data: {
            title: title,
            user: { connect: {id: Number(id)} },
            kanban: { create: DEFAULT_KANABN }
        }
    })

    return createdProject ? res.json(HTTP_RESPONSE.OK) : res.json(HTTP_RESPONSE.UNAUTHORIZED)
}

const getProjectById = async (req, res) => {
    const id = req.user.id;
    const projects = await prisma.project.findMany({
        where: {
            userId: Number(id)
        },
        include: {
            kanban: {
                include: {
                    items: true
                }
            }
        }
    })

    return res.json({ data: projects })
}

const getSingleProject = async (req, res) => {
    const { id } = req.params

    const project = await prisma.project.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            kanban: {
                include: {
                    items: true
                }
            }
        }
    })
    return res.json({ data: project })
}

module.exports = {
    createProject,
    getProjectById,
    getSingleProject
};