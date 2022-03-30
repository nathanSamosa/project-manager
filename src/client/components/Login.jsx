import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { userLogin } from '../utils/auth-fetch'
import { StoreContext } from '../utils/store';
import { LOCAL_STORAGE, STORE_ACTIONS } from '../utils/config';

import '../styles/user-form.css'
import { BiX } from "react-icons/bi";

export const Login = ({ currentForm, setCurrentForm }) => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });

    const navigate = useNavigate();

    const { dispatch } = useContext(StoreContext);
    const handleDispatch = (type, payload) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const result = await userLogin(form);
        if (!result || result.error) {
            alert("login error", result.error)
            return;
        }

        localStorage.setItem(LOCAL_STORAGE.TOKEN, result.token);
        handleDispatch(STORE_ACTIONS.USER, {id: result.data.id, name: result.data.name});

        handleX();
        navigate(`/${result.data.id}`);
    };

    const handleX = () => {
        setCurrentForm('');
    }

    return (
        <form onSubmit={handleSubmit} className={`user-form ${currentForm === 'login' ? '' : 'hidden'}`}>
            <button type="button" onClick={handleX} className="BiX"><BiX /></button>
            <label>
                <h3>Email:</h3>
                <input
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    value={form.email}
                    onChange={handleChange}
                    minLength="3"
                    required
                />
            </label>
            <label>
                <h3>Password:</h3>
                <input
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={handleChange}
                    minLength="6"
                    required
                />
            </label>
            <button type="submit" className="button button-blue">Login</button>
        </form>
    )
}