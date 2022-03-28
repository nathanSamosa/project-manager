import React, { useEffect, useState, useReducer } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { tokenFetch } from '../utils/auth-fetch'
import { StoreContext, reducer, initialState } from '../utils/store';
import { API_URL, LOCAL_STORAGE, STORE_ACTIONS } from '../utils/config';

import { Landing } from './Landing';
import { Home } from './Home';

import '../styles/App.css';

export const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(true);

    const { user } = state;

    const navigate = useNavigate();

    const handleDispatch = (type, payload) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const fetchUserFromToken = async(token) => {
        const result = await tokenFetch(API_URL.USER_GET, token)
        const { name } = result.data
        if (result) handleDispatch(STORE_ACTIONS.USER, name);
    };

    useEffect(async() => {
        const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
        if (token) await fetchUserFromToken(token);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        console.log(isLoading)
        if (!isLoading && !user) {
            navigate('')
        }
    }, [isLoading])

    return (
        <StoreContext.Provider value={{ state: state, dispatch: dispatch }}>
            <div className="app">     
                <Routes>
                    {user &&
                        <>
                            <Route path="/:user" element={<Home />} />
                            <Route path="*" element={<Home />} />
                        </>
                    }
                    {!user &&
                        <>
                            <Route path="/" element={<Landing />} />
                            <Route path="*" element={<Landing />} />
                        </>
                    }
                </Routes>
            </div>
        </StoreContext.Provider>
    );
}
