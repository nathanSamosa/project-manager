import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd';

import { LOCAL_STORAGE } from '../utils/config';
import { putItem } from '../utils/auth-fetch';
import { onDragEnd } from '../utils/d-n-d';


import { KanbanColumn } from './KanbanColumn';

export const KanbanTable = ({ kanban, setKanban, setFetchKanban }) => {
    const handlePut = async(result) => {
        const itemId = Number(result.draggableId)
        const destColumnId = kanban[Number(result.destination.droppableId)].id
        const reqBody = {id: itemId, columnId: destColumnId}
        console.log(reqBody)
        const res = await putItem(reqBody, localStorage.getItem(LOCAL_STORAGE.TOKEN));
        res.CODE === 200 ? setFetchKanban(true) : alert("ERROR", res.CODE);
        
        console.log("item", itemId, "columnId", destColumnId)
    }

    const handleDragEnd = result => {
        const newColumns = onDragEnd(result, kanban)
        if (newColumns) {
            setKanban(newColumns)
            handlePut(result)
        }
    }
 
    return (
        <div className="kanban-table">
            {kanban && 
                <DragDropContext onDragEnd={handleDragEnd}>
                    {Object.entries(kanban).map(([id, column]) =>
                        <KanbanColumn key={id} id={id} column={column} setFetchKanban={setFetchKanban}/>
                    )}
                </DragDropContext>
            }
        </div>
    )
}