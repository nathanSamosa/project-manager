import React, { useEffect, useReducer } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { tokenFetch, projectFetch } from '../utils/auth-fetch'
import { StoreContext, reducer, initialState } from '../utils/store';
import { API_URL, LOCAL_STORAGE, STORE_ACTIONS } from '../utils/config';

import { Landing } from './Landing';
import { Nav } from './Nav';
import { Home } from './Home';
import { ProjectPage } from './ProjectPage';
import { Kanban } from './Kanban';
import { Tickets } from './Tickets';

import '../styles/App.css';

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
        const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
        fetchProjects(token)
        if (refresh) handleDispatch(STORE_ACTIONS.REFRESH, false);
    }, [refresh, user])

    const handleLogout = () => {
        localStorage.removeItem(LOCAL_STORAGE.TOKEN);
        handleDispatch(STORE_ACTIONS.USER, null);
        navigate(`/`);
    };

    const handleProjectsNav = (e) => {
        handleDispatch(STORE_ACTIONS.SELECTED_PROJECT, null)
        e === "contact" ? navigate(`/${user.id}/contact`) : navigate(`/${user.id}`)
        
    }

    return (
        <StoreContext.Provider value={{ state: state, dispatch: dispatch }}>
            <div className="app">
                    {(user && user.id) &&
                        <div className="user-app">
                            <Nav handleLogout={handleLogout} handleProjectsNav={handleProjectsNav}/>

                            <div className="user-routes">
                                <Routes>
                                    <Route path="/:userId" element={<Home />} />
                                    <Route path="/:userId/:projectId" element={<ProjectPage />} />
                                    <Route path="/:userId/:projectId/kanban" element={<Kanban />} />
                                    <Route path="/:userId/:projectId/tickets" element={<Tickets />} />
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
