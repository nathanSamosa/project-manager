import React, { useState, useContext } from 'react';

import { projectPost } from '../utils/auth-fetch';
import { StoreContext } from '../utils/store';
import { STORE_ACTIONS } from '../utils/config';

export const CreateProjectButton = () => {
    const { dispatch } = useContext(StoreContext);
    const handleDispatch = (type, payload) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };
    
    const [isFetching, setIsFetching] = useState(false);
    const [form, setForm] = useState({ title: "" })
    const handleChange = e => setForm({ title: e.target.value })

    const handlePost = async() => {
        setIsFetching(true)
        try {
            const res = await projectPost(form, localStorage.getItem('token'))
            console.log(res)
            setIsFetching(false)
            if (res.CODE === 200) {
                handleDispatch(STORE_ACTIONS.REFRESH, true)
                setForm({ title: "" })
            } else {
                alert("ERROR", res.CODE);
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = () => {
        const validTitle =  2 < form.title.length && form.title.length < 25
        validTitle ? handlePost() : alert("invalid project title")
    }
    return (
        <div className="create-project">
            <div className="create-project-container">
                <input className="create-project-form"
                    name="title"
                    type="text"
                    placeholder="Project title..."
                    onChange={handleChange}
                    value={form.title}
                />
                <div className="action-display">
                    <div className="action-prompt">Create project</div>
                    <div className="action-button" onClick={handleClick}>Create</div>
                </div>
                <div className="button-cover"></div>
                <div data={isFetching ? "fetching" : null} className="fetch-cover">
                    <span>Building project</span><div className="spin-loader"></div>
                </div>
            </div>
        </div>
    )
}