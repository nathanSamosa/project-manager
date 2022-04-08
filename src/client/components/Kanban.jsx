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
    const [selectedItem, setSelectedItem] = useState(null)
    const [itemConfig, setItemConfig] = useState({
        priority: false,
        delete: false
    })

    // Getters
    const reorderKanban = kanban => {
        const reorderedKanban = [];
        [...kanban].forEach(column => {
            column.items.sort((a, b) => a.columnIndex - b.columnIndex)
            reorderedKanban.push(column)
        })
        return reorderedKanban
    }

    useEffect(async() => {
        if (fetchKanban) {
            const res = await fetch(`${API_URL.PROJECT_GET}${selectedProject.id}`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem(LOCAL_STORAGE.TOKEN)
                }
            })
            const data = await res.json();
            const reorderedKanban = reorderKanban(data.data.kanban)
            setKanban(reorderedKanban)
            setFetchKanban(false)
        }
    }, [fetchKanban])

    // Init
    useEffect(() => {
        const selectedProject = projects.filter(project => project.id === Number(params.projectId))[0];
        handleDispatch(STORE_ACTIONS.SELECTED_PROJECT, selectedProject);
        if (selectedProject) {
            if (!fetchKanban) setFetchKanban(true)
        }
    }, [projects])

    return (
        <div className="project-page kanban-page">
            {kanban &&
                <div className="project-display kanban-display">
                    <div className="kanban-table-container">
                        <KanbanTable
                            kanban={kanban}
                            setKanban={setKanban}
                            setFetchKanban={setFetchKanban}
                            itemConfig={itemConfig}
                            setSelectedItem={setSelectedItem}
                        />
                    </div>

                    <KanbanConfig
                        kanban={kanban}
                        setFetchKanban={setFetchKanban}
                        setItemConfig={e => setItemConfig({...itemConfig, [e.target.name]: !itemConfig[e.target.name]})}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                    />

                </div>   
            }
        </div>
    )
}