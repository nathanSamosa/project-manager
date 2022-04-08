import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { StoreContext } from '../utils/store';
import { dataFetch, deleteProject } from '../utils/auth-fetch';
import { LOCAL_STORAGE } from '../utils/config';
import { BiTrash } from 'react-icons/bi'
// import { FaTrash } from 'react-icons/fa'

import { CreateProjectButton } from './CreateProjectButton';
import { Chart } from './Chart'
import { ProgressBar } from './ProgressBar';

import '../styles/home.css'
import '../styles/project-button.css'

export const Home = () => {
    const navigate = useNavigate();
    const { state } = useContext(StoreContext);
    const { user, projects, selectedProject } = state;

    const [localProjects, setLocalProjects] = useState();
    const fetchProjects = async() => {
        const res = await dataFetch(localStorage.getItem(LOCAL_STORAGE.TOKEN))
        if (res) {
            setLocalProjects(null)
            setLocalProjects(res.data.reverse())
        }
    }
    useEffect(async() => {
        fetchProjects()
    }, [projects, selectedProject])

    const handleClick = e => {
        navigate(`/${user.id}/${e.id}`)
    }

    const handleDelete = async(e) => {
        const res = await deleteProject(e.id, localStorage.getItem(LOCAL_STORAGE.TOKEN))
        if (res) fetchProjects()
    }

    return (
        <div className="home">
            <div className="home-display">
                <CreateProjectButton />
                <div className="projects-container container">
                
                        {localProjects && localProjects.map(project => {
                            return (
                                <div key={project.id} className="project">
                                    <BiTrash className="homepage-trash" onClick={() => handleDelete(project)}/>
                                    <h3>{project.title}</h3>
                                    <div className="project-pie"><Chart project={project}/></div>
                                    <div className="project-tickets"><ProgressBar project={project}/></div>
                                    <div>
                                        <button
                                            className="project-button"
                                            name={project.title}
                                            onClick={() => handleClick(project)}
                                        >More</button>
                                    </div>
                                </div>
                            )
                        })}
                    
                </div>
            </div>
        </div>
    )
}