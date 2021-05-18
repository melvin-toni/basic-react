import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import Axios from 'axios';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';

async function loginUser(credentials) {

    return fetch('https://dev.innov.id/bara-mcp/public/api/client-login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}

export default function Login({ setToken }) {
    const [firmIdentifier, setFirmIdentifier] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async e => {
        e.preventDefault();
        const val = await loginUser({
            firmIdentifier,
            email,
            password
        });
        console.log('token >>', val.credentials);
        setToken(val.credentials);
    }
    
    return(
        <div className="login-wrapper">
            <h1>Please Log In</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    <p>Firm ID</p>
                    <input type="text" name="firmIdentifier" onChange={(e) => {setFirmIdentifier(e.target.value)}} />
                </label> 
                <label>
                    <p>Email</p>
                    <input type="text" name="email" onChange={(e) => {setEmail(e.target.value)}} />
                </label> 
                <label>
                    <p>Password</p>
                    <input type="password" name="password" onChange={(e) => {setPassword(e.target.value)}} />
                </label> 
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}