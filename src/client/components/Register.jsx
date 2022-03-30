import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { userRegister } from '../utils/auth-fetch'
import { StoreContext } from '../utils/store';
import { LOCAL_STORAGE, STORE_ACTIONS } from '../utils/config';

import '../styles/user-form.css'
import { BiX } from "react-icons/bi";

export const Register = ({ currentForm, setCurrentForm }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [confirmPassword, setConfirmPassword] = useState("");
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
        console.log(form)
        if (form.password !== confirmPassword) {
            alert("passwords must match")
            return;
        }
        const result = await userRegister(form);
        if (!result || result.error) {
            alert("register error", result.error)
            return;
        }

        localStorage.setItem(LOCAL_STORAGE.TOKEN, result.token);
        handleDispatch(STORE_ACTIONS.USER, result.data.name);

        navigate(`/${result.data.name.toLowerCase()}`);
    };

    const handleX = () => setCurrentForm('');

    return (
        <form onSubmit={handleSubmit} className={`user-form ${currentForm === 'register' ? '' : 'hidden'}`}>
            <button type="button" onClick={handleX} className="BiX"><BiX /></button>
            <label>
                <h3>First name:</h3>
                <input
                    name="name"
                    type="test"
                    placeholder="Enter name"
                    value={form.name}
                    onChange={handleChange}
                    minLength="3"
                    required
                />
            </label>
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
            <label>
                <h3>Confirm password:</h3>
                <input
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    minLength="6"
                    required
                />
            </label>
            <button type="submit" className="button button-blue">Create Account</button>
        </form>
    )
}