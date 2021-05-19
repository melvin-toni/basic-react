import React from 'react';
import { BrowserRouter, Route, Switch, useHistory, Redirect } from 'react-router-dom';
import './App.css';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';

import Navbar from './Navbar';
import ClientList from '../Clients/Client-list';
import useToken from './useToken';
import axios from 'axios';


function App() {
  const { token, setToken } = useToken();
  // let history = useHistory();

  console.log('TOKEN IN APP 1 >>', token);
  
  if(!token) {
    console.log('TOKEN IN APP null >>');
    return <Login setToken={setToken} />
  }
  // history.push('/clients')
  axios.interceptors.request.use(
    config => {
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  )

  return (
    <div className="wrapper">
      <h1>Application</h1>
      
      <BrowserRouter>
        <Navbar />
        
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/client-list" component={ClientList} />
      </BrowserRouter>
    </div>
  );
}

export default App;