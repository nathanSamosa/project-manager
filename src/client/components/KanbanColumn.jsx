import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { KanbanItem } from './KanbanItem';

export const KanbanColumn = ({id, column, setFetchKanban}) => {
    const attr = (provided, snapshot) => {
        return {
            ...provided.droppableProps,
            ref: provided.innerRef,
            style: { background: snapshot.isDraggingOver ? 'lightblue' : 'var(--clr-white)' }
        }
    }

    return (
        <div className="kanban-column">
            <h2>{column.title}</h2>
            <Droppable droppableId={id}>
                {(provided, snapshot) => {
                    return (
                        <div className="droppable-div" {...attr(provided, snapshot)}>
                            {column.items.map((item, index) =>
                                <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                                    {(provided, snapshot) =>
                                        <KanbanItem item={item} provided={provided} snapshot={snapshot} setFetchKanban={setFetchKanban}/>
                                    }
                                </Draggable>
                            )}
                            {provided.placeholder}
                        </div>
                    )
                }}
            </Droppable>
        </div>
    )
}