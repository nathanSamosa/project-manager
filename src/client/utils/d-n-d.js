const dropInSameColumn = (columns, source, destination) => {
    const column = columns[source.droppableId];
    const copiedItems = [ ...column.items ];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    const newColumns = {
        ...columns,
        [source.droppableId]: {
            ...column,
            items: copiedItems
        }
    }
    const newKanban = [];
    for (const column in newColumns) newKanban.push(newColumns[column])
    return newKanban
}

const dropInDifferentColumn = (columns, source, destination) => {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [ ...sourceColumn.items ];
    const destItems = [ ...destColumn.items ];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    const newColumns = {
        ...columns,
        [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems
        },
        [destination.droppableId]: {
            ...destColumn,
            items: destItems
        }
    }
    const newKanban = [];
    for (const column in newColumns) newKanban.push(newColumns[column])
    return newKanban
}

export const onDragEnd = (result, columns) => {
    if(!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId == destination.droppableId) {
        return dropInSameColumn(columns, source, destination);
    } else {
        return dropInDifferentColumn(columns, source, destination);
    }
    
}