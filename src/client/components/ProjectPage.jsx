import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { StoreContext } from '../utils/store';
import { STORE_ACTIONS } from '../utils/config';



export const ProjectPage = () => {
    const params = useParams();
    const { state, dispatch } = useContext(StoreContext);
    const { projects, selectedProject } = state

    const handleDispatch = (type, payload) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    useEffect(() => {
        const selectedProject = projects.filter(project => project.id === Number(params.projectId))[0]
        handleDispatch(STORE_ACTIONS.SELECTED_PROJECT, selectedProject)

    }, [projects])

    return (
        <div className="project-page">
            <div className="project-display">
                {selectedProject &&
                    <h1>{selectedProject.title} Dashboard</h1>
                }
            </div>
        </div>
    )
}