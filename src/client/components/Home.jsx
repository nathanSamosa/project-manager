import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { StoreContext } from '../utils/store';

import { CreateProjectButton } from './CreateProjectButton';

import '../styles/home.css'
import '../styles/project-button.css'

export const Home = () => {
    const [localProjects, setLocalProjects] = useState();
    const navigate = useNavigate();
    const { state } = useContext(StoreContext);
    const { user, projects } = state;



    useEffect(() => {
        if (projects) setLocalProjects([ ...projects ].reverse())
    }, [projects])

    const handleClick = e => {
        console.log(e.id)
        navigate(`/${user.id}/${e.id}`)
    }

    console.log("state", user, projects)

    return (
        <div className="home">
            <div className="home-display">
                <CreateProjectButton />
                <div className="projects-container container">
                
                        {localProjects && localProjects.map(project => {
                            return (
                                <div key={project.id} className="project">
                                    <h3>{project.title}</h3>
                                    <div className="project-pie"></div>
                                    <div className="project-tickets"></div>
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