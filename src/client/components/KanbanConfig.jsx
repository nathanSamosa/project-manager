import React, { useState } from 'react'

import { postItem } from '../utils/auth-fetch'

import '../styles/kanban-config.css'
import { LOCAL_STORAGE } from '../utils/config'



export const KanbanConfig = ({kanban, setFetchKanban}) => {
    const initialForm = {
        title: "",
        columnId: kanban[0].id
    }
    const [form, setForm] = useState(initialForm)

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmitItem = async(e) => {
        e.preventDefault();
        const res = await postItem(form, localStorage.getItem(LOCAL_STORAGE.TOKEN));
        res.CODE === 200 ? setFetchKanban(true) : alert("ERROR", res.CODE);
    }

    return (
        <div className="kanban-config">
            <form onSubmit={handleSubmitItem}>
                <label>
                    Title:
                    <input type="text" name="title" value={form.title} onChange={handleChange}></input>
                </label>
                <label>
                    Category:
                    <select name="columnId" value={form.columnId} onChange={handleChange}>
                        {kanban.map(column =>
                            <option key={column.id} value={column.id}>{column.title}</option>
                        )}
                    </select>
                </label>
                <button type="submit">New item</button>
            </form>
            
        </div>
    )
}