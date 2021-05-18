import React, {useState} from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [firmIdentifier, setFirmIdentifier] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submitReview = () => {
    Axios.post('https://dev.innov.id/bara-mcp/public/api/client-login', {
      firmIdentifier: firmIdentifier,
      email: email,
      password: password
    }).then((res) => {
      alert('Successfully login');
      console.log(JSON.stringify(res));
    }).catch(err => alert(err));
  }

  return (
    <div className="App">
      <h1>CRUD APPS</h1>

      <div className="form">
        <label>Firm ID</label> <input type="text" name="firmIdentifier" onChange={(e) => {setFirmIdentifier(e.target.value)}}/>
        <label>Email</label> <input type="text" name="email"  onChange={(e) => {setEmail(e.target.value)}}/>
        <label>Password</label> <input type="password" name="password" onChange={(e) => {setPassword(e.target.value)}} />

        <button onClick={submitReview}>Submit</button>
      </div>
    </div>
  );
}

export default App;
