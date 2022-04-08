import React, { useEffect, useState } from 'react';

import { putItemDetails } from '../utils/auth-fetch';
import { LOCAL_STORAGE } from '../utils/config';

export const ItemDetails = ({ selectedItem, setSelectedItem, setFetchKanban }) => {
    const [form, setForm] = useState()
    useEffect(() => { if (selectedItem) setForm({...selectedItem}) }, [selectedItem])

    const handleChange = e => setForm({...form, [e.target.name]: e.target.value})

    const handleClick = e => {
        if (e) e.preventDefault()
        setSelectedItem(null)
        setForm(null)
        setFetchKanban(true)
    }

    const handleSubmitItem = async(e) => {
        e.preventDefault();
        const res = await putItemDetails(form, localStorage.getItem(LOCAL_STORAGE.TOKEN));
        res.CODE === 200 ? handleClick() : alert("ERROR", res.CODE);
    }

    console.log(selectedItem)
    return (
        <div className="item-details">
            {form &&
                <form onSubmit={handleSubmitItem}>
                    <label>
                        Title:
                        <input name="title" type="text" value={form.title} onChange={handleChange}/>
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
                    <label>
                        Details:
                        <textarea name="details" value={form.details} onChange={handleChange}/>
                    </label>
                    <div className="details-button-container">
                        <button className="details-button cancel-button" onClick={handleClick}>Cancel</button>
                        <button className="details-button" type="submit">Save</button>
                    </div>
                </form>
            }
            
        </div>
    )
}