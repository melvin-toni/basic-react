import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import useToken from './useToken';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Navbar from './Navbar';
import ClientList from '../Clients/Client-list';
import ClientEdit from '../Clients/Client-edit';

function App() {
  const { token, setToken } = useToken();
  
  if(!token) {
    return <Login setToken={setToken} />
  }

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
        
        <Route path="/home" component={Dashboard} />
        <Route path="/client-list" component={ClientList} />
        <Route path="/client-edit/:id" component={ClientEdit} />
      </BrowserRouter>
    </div>
  );
}

export default App;