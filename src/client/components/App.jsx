import React, { useEffect, useReducer } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { tokenFetch, projectFetch } from '../utils/auth-fetch'
import { StoreContext, reducer, initialState } from '../utils/store';
import { API_URL, LOCAL_STORAGE, STORE_ACTIONS } from '../utils/config';

import { Landing } from './Landing';
import { Home } from './Home';
import { ProjectPage } from './ProjectPage';

import '../styles/App.css';
import logo from '../assets/logo.png'

export const App = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);
    const { user, refresh } = state;

    const handleDispatch = (type, payload) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const fetchProjects = async(token) => {
        const res = await projectFetch(token)
        console.log("saving projects in state...", res.data)
        handleDispatch(STORE_ACTIONS.PROJECTS, res.data);
    }

    const fetchUserFromToken = async(token) => {
        const result = await tokenFetch(API_URL.USER_GET, token)
        const { id, name } = result.data
        if (result) {
            handleDispatch(STORE_ACTIONS.USER, { id: id, name: name });
            await fetchProjects(token)
        }
    };

    useEffect(async() => {
        const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
        if (token) await fetchUserFromToken(token);
    }, []);

    useEffect(() => {
        if (refresh) {
            const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
            fetchProjects(token)
            handleDispatch(STORE_ACTIONS.REFRESH, false);
        }
    }, [refresh])

    const handleLogout = () => {
        localStorage.removeItem(LOCAL_STORAGE.TOKEN);
        handleDispatch(STORE_ACTIONS.USER, null);
        navigate(`/`);
    };

    const handleProjectsNav = () => {
        navigate(`/${user.id}`)
    }

    return (
        <StoreContext.Provider value={{ state: state, dispatch: dispatch }}>
            <div className="app">
                    {(user && user.id) &&
                        <div className="user-app">
                            <nav>
                                <div className="welcome">
                                    <img src={logo}/>
                                    <div>
                                        <h1>Hello,</h1>
                                        <h1 className="welcome-name">{user.name}</h1>
                                    </div>
                                </div>
                                <div className="user-nav">
                                    <button onClick={handleLogout}>Log out</button>
                                    <button onClick={handleProjectsNav}>Projects</button>
                                    <button>Contact</button>
                                </div>
                            </nav>

                            <div className="user-routes">
                                <Routes>
                                    <Route path="/:userId" element={<Home />} />
                                    <Route path="/:userId/:projectId" element={<ProjectPage />} />
                                    <Route path="*" element={<Home />} />
                                </Routes>
                            </div>
                        </div>
                    }
                    {(!user || !user.id) &&
                        <Routes>
                            <Route path="/" element={<Landing />} />
                            <Route path="*" element={<Landing />} />
                        </Routes>
                    }
                
            </div>
        </StoreContext.Provider>
    );
}
