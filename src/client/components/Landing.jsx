import React from 'react';
import { Link } from 'react-router-dom';

// import { UserForm } from './UserForm'

import '../styles/landing.css'
import logo from '../assets/logo.png'

export const Landing = () => {

    return (
        <div className="landing">
            <div className="landing-background"></div>
            <div className="container">
                <div className="landing-header">
                    <h1><img src={logo}/>Samosa</h1>
                    <nav>
                        <Link to="/">Contact</Link>
                        <Link to="/">Demo</Link>
                        <Link to="/" className="button login">Sign in</Link>
                        <Link to="/" className="button register">Create account</Link>
                    </nav>
                </div>
                <div className="landing-body">
                    <h2>Create personal project boards and bug trackers in minutes.</h2>
                    <Link to="/" className="button register">Create your free account here</Link>
                </div>
            </div>
        </div>

    )
}