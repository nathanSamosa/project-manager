const { prisma } = require('../utils/prisma');

const { HTTP_RESPONSE } = require('../config')

const createItem = async (req, res) => {
    const { title, columnId, columnIndex, priority } = req.body
    console.log(req.body)
    const item = await prisma.kanbanItem.create({
        data: {
            title: title,
            columnId: Number(columnId),
            columnIndex: columnIndex,
            priority: priority,
            details: '',
        }
    })
    return item ? res.json(HTTP_RESPONSE.OK) : res.json(HTTP_RESPONSE.UNAUTHORIZED)
}

const updateItem = async(req, res) => {

    for (let column of req.body) {
        for (let item of column.items) {
            await prisma.kanbanItem.update({
                where: {
                    id: item.id
                },
                data: {
                    columnId: Number(item.columnId),
                    columnIndex: Number(item.columnIndex)
                }
            })
            console.log('item updated')
        }
    }
    return res.json(HTTP_RESPONSE.OK)
}

const updateItemDetails = async(req, res) => {

    const { id, title, priority, details } = req.body
    const item = await prisma.kanbanItem.update({
        where: {
            id: id
        },
        data: {
            title: title,
            priority: priority,
            details: details
        }
    })
    console.log(item)
    return item ? res.json(HTTP_RESPONSE.OK) : res.json(HTTP_RESPONSE.UNAUTHORIZED)
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
    updateItemDetails,
    deleteItem
};