import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd';

import { LOCAL_STORAGE } from '../utils/config';
import { putItem } from '../utils/auth-fetch';
import { onDragEnd } from '../utils/d-n-d';


import { KanbanColumn } from './KanbanColumn';

export const KanbanTable = ({ kanban, setKanban, setFetchKanban, itemConfig, setSelectedItem }) => {
    const handlePut = async(newColumns) => {

        const res = await putItem(newColumns, localStorage.getItem(LOCAL_STORAGE.TOKEN));
        if (res.CODE !== 200) alert("ERROR", res.CODE);
        console.log("kanban updated", res)
    }

    const handleDragEnd = result => {
        const newColumns = onDragEnd(result, kanban)
        if (newColumns) {
            setKanban(newColumns)
            handlePut(newColumns)
        }
    }

    console.log(kanban)
 
    return (
        <div className="kanban-table">
            {kanban && 
                <DragDropContext onDragEnd={handleDragEnd}>
                    {Object.entries(kanban).map(([id, column]) =>
                        <KanbanColumn
                            key={id}
                            id={id}
                            column={column}
                            setFetchKanban={setFetchKanban}
                            itemConfig={itemConfig}
                            setSelectedItem={setSelectedItem}
                        />
                    )}
                </DragDropContext>
            }
        </div>
    )
}