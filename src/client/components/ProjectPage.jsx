import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { StoreContext } from '../utils/store';

import '../styles/project-page.css'

export const ProjectPage = () => {
    const params = useParams();
    const { state } = useContext(StoreContext);
    const { projects } = state

    const [project, setProject] = useState()
    useEffect(() => setProject(projects.filter(project => project.id === Number(params.projectId))[0]), [projects])

    return (
        <div className="project-page">
            <div className="project-display">
                {project &&
                    <h1>{project.title}</h1>
                }
            </div>
        </div>
    )
}