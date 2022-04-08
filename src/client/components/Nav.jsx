import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { StoreContext } from '../utils/store';

import logo from '../assets/logo.png';

export const Nav = ({handleLogout, handleProjectsNav}) => {
    const navigate = useNavigate();
    const { state } = useContext(StoreContext);
    const { user, selectedProject } = state;

    const [currentTab, setCurrentTab] = useState("projects")

    const handleClick = e => {
        if (e.target.name === "logout") handleLogout()
        if (e.target.name === "projects") handleProjectsNav(e.target.name)
        if (e.target.name === "contact") handleProjectsNav(e.target.name)
        if (e.target.name === "kanban") navigate(`/${user.id}/${selectedProject.id}/kanban`)
        if (e.target.name === "tickets") navigate(`/${user.id}/${selectedProject.id}/tickets`)
        setCurrentTab(e.target.name)
    }
    useEffect(() => console.log("accessing tab", currentTab), [currentTab])

    return (
        <nav>
            <div className="welcome">
                <img src={logo}/>
                <div>
                    <h1>Hello,</h1>
                    <h1 className="welcome-name">{user.name}</h1>
                </div>
            </div>
            <div className="user-nav">
                <button name="logout" onClick={handleClick}>Log out</button>
                <button name="projects" onClick={handleClick}>Projects</button>
                <button name="contact" onClick={handleClick}>Contact</button>
            </div>
            {(selectedProject && selectedProject.title) &&
                <div className="project-title">
                    <h1>{selectedProject.title}</h1>
                </div>
            }
        </nav>
    )
}