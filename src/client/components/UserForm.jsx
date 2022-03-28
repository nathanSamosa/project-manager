import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { userLogin } from '../utils/auth-fetch'
import { StoreContext } from '../utils/store';
import { API_URL, LOCAL_STORAGE, STORE_ACTIONS } from '../utils/config';



export const UserForm = () => {

    const { dispatch } = useContext(StoreContext);

    const navigate = useNavigate();

    const handleDispatch = (type, payload) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const result = await userLogin(API_URL.USER_LOGIN, form);

        if (!result || result.error) {
            alert("login error", result.error)
            return;
        }

        console.log(result.data)

        localStorage.setItem(LOCAL_STORAGE.TOKEN, result.token);

        handleDispatch(STORE_ACTIONS.USER, result.data.name);

        navigate(`/${result.data.name.toLowerCase()}`)
    };

    return (
        <form className="user-form">
            <input
                name="email"
                type="text"
                placeholder="Enter email"
                value={form.username}
                onChange={handleChange}
                minLength="3"
                required
            />
            <input
                name="password"
                type="password"
                placeholder="Enter email"
                value={form.password}
                onChange={handleChange}
                minLength="6"
                required
            />
            <button onClick={handleSubmit}>Login</button>
        </form>
    )
}