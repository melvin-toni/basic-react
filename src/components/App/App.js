import React from 'react';
import { BrowserRouter, Route, Switch, useHistory, Redirect } from 'react-router-dom';
import './App.css';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Clients from '../Clients/Clients';
import useToken from './useToken';


function App() {
  const { token, setToken } = useToken();
  // let history = useHistory();

  console.log('TOKEN IN APP 1 >>', token);
  if(!token) {
    console.log('TOKEN IN APP null >>');
    return <Login setToken={setToken} />
  }
  // history.push('/clients')

  return (
    <div className="wrapper">
      <h1>Application</h1>
      
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard" component={Dashboard} >
            <Dashboard />
          </Route>
          <Route path="/clients" component={Clients} >
            <Clients />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;