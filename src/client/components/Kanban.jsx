import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { StoreContext } from '../utils/store';
import { LOCAL_STORAGE, STORE_ACTIONS, API_URL } from '../utils/config';

import { KanbanTable } from './KanbanTable';
import { KanbanConfig } from './KanbanConfig';

import '../styles/kanban.css'
import '../styles/kanban-table.css'

export const Kanban = () => {
    // Global state
    const params = useParams();
    const { state, dispatch } = useContext(StoreContext);
    const { projects, selectedProject } = state

    const handleDispatch = (type, payload) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    // State
    const [fetchKanban, setFetchKanban] = useState(false)
    const [kanban, setKanban] = useState()

    // Getters
    useEffect(async() => {
        if (fetchKanban) {
            console.log(`${API_URL.PROJECT_GET}${selectedProject.id}`)
            const res = await fetch(`${API_URL.PROJECT_GET}${selectedProject.id}`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem(LOCAL_STORAGE.TOKEN)
                }
            })
            const data = await res.json();
            console.log(data)
            setKanban(data.data.kanban)
            setFetchKanban(false)
        }
    }, [fetchKanban])

    // Init
    useEffect(() => {
        const selectedProject = projects.filter(project => project.id === Number(params.projectId))[0];
        handleDispatch(STORE_ACTIONS.SELECTED_PROJECT, selectedProject);
        if (selectedProject) {
            console.log(selectedProject.id)
            if (!fetchKanban) setFetchKanban(true)
        }
    }, [projects])

    

    return (
        <div className="project-page kanban-page">
            {kanban &&
                <div className="project-display kanban-display">
                    <KanbanTable kanban={kanban} setKanban={setKanban} setFetchKanban={setFetchKanban}/>
                    <KanbanConfig kanban={kanban} setFetchKanban={setFetchKanban}/>
                </div>   
            }
        </div>
    )
}