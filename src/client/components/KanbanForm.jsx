import React, { useState } from 'react';

import { LOCAL_STORAGE } from '../utils/config';
import { postItem } from '../utils/auth-fetch';


export const KanbanForm = ({kanban, setFetchKanban}) => {
    const initialForm = {
        title: "",
        column: 0,
        priority: "low",
    }
    const [form, setForm] = useState(initialForm)
    const handleChange = e => setForm({...form, [e.target.name]: e.target.value})

    const resetForm = () => {
        setFetchKanban(true)
        setForm(initialForm)
    }

    const handleSubmitItem = async(e) => {
        e.preventDefault();
        const columnLength = kanban[form.column].items.length
        const columnIndex = columnLength ? kanban[form.column].items[columnLength - 1].columnIndex + 1 : 0;

        const newItem = {
            title: form.title,
            columnId: kanban[form.column].id,
            columnIndex: columnIndex,
            priority: form.priority,
            details: ""
        }
        const res = await postItem(newItem, localStorage.getItem(LOCAL_STORAGE.TOKEN));
        res.CODE === 200 ? resetForm() : alert("ERROR", res.CODE);
    }

    return (
        <form onSubmit={handleSubmitItem}>
            <label>
                Title:
                <input type="text" name="title" value={form.title} onChange={handleChange} required />
            </label>
            <label>
                Category:
                <select name="column"  onChange={handleChange} value={form.priority} required>
                    {kanban.map((column, index) =>
                        <option key={column.id} value={index}>{column.title}</option>
                    )}
                </select>
            </label>
            <label>
                Priority:
                <select name="priority" onChange={handleChange} value={form.priority} required>
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Ugent</option>
                </select>
            </label>
            <button type="submit">New item</button>
        </form>
    )
}