import React, { useState } from 'react';

import { deleteItem } from '../utils/auth-fetch';
import { LOCAL_STORAGE } from '../utils/config';

import { BiTrash } from 'react-icons/bi'

export const KanbanItem = ({item, provided, snapshot, setFetchKanban}) => {
    const attr = {
        ...provided.draggableProps,
        ...provided.dragHandleProps,
        ref: provided.innerRef,
        style: {
            ...provided.draggableProps.style,
            backgroundColor: snapshot.isDragging ? 'var(--clr-primary1)' : 'var(--clr-primary2)'
        }
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
        <div className="draggable-div kanban-item" {...attr}>
            {item.title}
            <BiTrash className="kanban-item-trash" onClick={() => handleClick(item.id)}/>
        </div>
    )
}