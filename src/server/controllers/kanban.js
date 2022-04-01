const { prisma } = require('../utils/prisma');

const { HTTP_RESPONSE } = require('../config')

const createItem = async (req, res) => {
    const { title, columnId } = req.body
    const item = await prisma.kanbanItem.create({
        data: {
            title: title,
            columnId: Number(columnId)
        }
    })
    return item ? res.json(HTTP_RESPONSE.OK) : res.json(HTTP_RESPONSE.UNAUTHORIZED)
}

const updateItem = async(req, res) => {
    const { id, columnId } = req.body

    const updatedItem = await prisma.kanbanItem.update({
        where: {
            id: id
        },
        data: {
            columnId: Number(columnId)
        }
    })

    return updatedItem ? res.json(HTTP_RESPONSE.OK) : res.json(HTTP_RESPONSE.UNAUTHORIZED)
}

const deleteItem = async(req, res) => {
    const { id } = req.body
    const deleteditem = await prisma.kanbanItem.delete({
        where: {
            id: id
        }
    })
    return deleteditem ? res.json(HTTP_RESPONSE.OK) : res.json(HTTP_RESPONSE.UNAUTHORIZED)
}



module.exports = {
    createItem,
    updateItem,
    deleteItem
};