import React from 'react';

import { Login } from './Login';
import { Register } from './Register';

export const LandingBody = ({handleClick, currentForm, setCurrentForm}) => {

    return (
        <div className="landing-body">
            <div className={`hero ${!currentForm ? '' : 'hidden'}`}>
                <h2>Create personal project boards and bug trackers in minutes.</h2>
                <button onClick={() => handleClick('register')} className="button button-blue">Create your free account here</button>
            </div>
            <Login currentForm={currentForm} setCurrentForm={setCurrentForm}/>
            <Register currentForm={currentForm} setCurrentForm={setCurrentForm}/>
        </div>
    )
}