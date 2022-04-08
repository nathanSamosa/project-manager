import React, { useState } from 'react';

import { deleteItem } from '../utils/auth-fetch';
import { LOCAL_STORAGE } from '../utils/config';

import { BiTrash, BiQuestionMark } from 'react-icons/bi'

export const KanbanItem = ({item, provided, snapshot, setFetchKanban, itemConfig, setSelectedItem}) => {


    const attr = {
        className: `draggable-div kanban-item ${snapshot.isDragging ? "isDragging" : ""}`,
        ...provided.draggableProps,
        ...provided.dragHandleProps,
        ref: provided.innerRef,
        style: {
            ...provided.draggableProps.style
        },
        data: itemConfig.priority ? item.priority : "default"
    }

    const [allowClick, setAllowClick] = useState(true)

    const handleClick = async(id) => {
        if (!allowClick) return
        setAllowClick(false)
        setTimeout(async() => {
            const res = await deleteItem({id: id}, localStorage.getItem(LOCAL_STORAGE.TOKEN));
            res.CODE === 200 ? setFetchKanban(true) : alert("ERROR", res.CODE);
            setTimeout(() => {
                setAllowClick(true)
            }, 500)
        }, 500)  
    }

    return (
        <div {...attr} >
            {item.title}
            <div className="action-container">
                <BiQuestionMark className="kanban-item-trash" onClick={() => setSelectedItem(item)}/>
                {itemConfig.delete &&
                    <BiTrash className="kanban-item-trash" onClick={() => handleClick(item.id)}/>
                }
            </div>
        </div>
    )
}