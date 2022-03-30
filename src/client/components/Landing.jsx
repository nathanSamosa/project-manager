import React, { useState } from 'react';

import { LandingBody } from './LandingBody';

import '../styles/landing.css'
import logo from '../assets/logo.png'

export const Landing = () => {
    const [currentForm, setCurrentForm] = useState('');

    const handleClick = form => {
        console.log(form)
        setCurrentForm(form)
    }

    return (
        <div className="landing">
            <div className="landing-background"></div>
            <div className="container">
                <div className="landing-header">
                    <h1><img src={logo}/>Samosa</h1>
                    <nav>
                        <button onClick={() => handleClick('contact')}>Contact</button>
                        <button onClick={() => handleClick('demo')}>Demo</button>
                        <button onClick={() => handleClick('login')} className="button login">Sign in</button>
                        <button onClick={() => handleClick('register')} className="button button-blue">Create account</button>
                    </nav>
                </div>

                <LandingBody
                    handleClick={e => handleClick(e)}
                    currentForm={currentForm}
                    setCurrentForm={setCurrentForm}
                />                
            </div>
        </div>

    )
}