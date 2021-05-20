import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './Login.css';

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
		if (val.meta.type === 'Unauthorized') {
			alert('Login failed');
			return <Login setToken={setToken} />
		} else {
			setToken(val.credentials);
			<Redirect to="/client-list" />
		}
	}

	return (

		<div className="container d-flex justify-content-center">
			<div className="box_login col-4 p-3">
				<div className="text-center">
					<h1>Log In</h1>
				</div>

				<form onSubmit={handleSubmit}>

					<div className="row align-items-center">
						<div className="col-3">
							<label className="col-form-label">Firm ID</label>
						</div>
						<div className="col-9">
							<input type="text" name="firmIdentifier" className="form-control" onChange={(e) => { setFirmIdentifier(e.target.value) }} />
						</div>
					</div>

					<div className="row align-items-center">
						<div className="col-3">
							<label className="col-form-label">Email</label>
						</div>
						<div className="col-9">
							<input type="text" name="email" className="form-control" onChange={(e) => { setEmail(e.target.value) }} />
						</div>
					</div>

					<div className="row align-items-center">
						<div className="col-3">
							<label className="col-form-label">Password</label>
						</div>
						<div className="col-9">
							<input type="password" name="password" className="form-control" onChange={(e) => { setPassword(e.target.value) }} />
						</div>
					</div>

					<div className="row align-items-center">
						<div className="offset-3 col-9">
							<button type="submit" className="btn btn-primary">Submit</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

Login.propTypes = {
	setToken: PropTypes.func.isRequired
}