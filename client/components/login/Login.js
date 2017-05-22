import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import axios from 'axios';

@connect(function (store) {
	return {
		info: store.user.info
	}
})

export default class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			error: ""
		}
	}

	handleChange(key, value) {
		this.setState({
			[key]: value
		})
	}

	sendRequest() {
		axios.post('/userLoginRequest', {
			email: this.state.email,
			password: this.state.password
		}).then(function (response) {
			if (response.data.error){
				this.setState({
					error: "Invalid login"
				})
			}else{
				browserHistory.push('/notes');
			}
		}.bind(this))
	}

	render() {
		if (Object.keys(this.props.info).length > 0) {
			if (!this.props.info.error) {
				browserHistory.push('/notes');
			}
		}

		let displayError = {display: false};
		if (this.state.error) {
			displayError = {
				display: true
			}
		}

		return (
			<div className="login">
				<div className="login-box">
					<Link to="/">
						<img src="/client/images/logo.png" alt=""/>
					</Link>
					<div>
						<legend>Email</legend>
						<input type="email"
							   onChange={(e) => this.handleChange("email", e.target.value)}
							   value={this.state.email}/>
					</div>
					<div>
						<legend>Password</legend>
						<input type="password"
							   onChange={(e) => this.handleChange("password", e.target.value)}
							   value={this.state.password}/>
						<p className="login-error" style={displayError}>{this.state.error}</p>
					</div>
					<div>
						<button className="common-button"
								onClick={this.sendRequest.bind(this)}
						>Login</button>
						<p className="already">Don't have an account? <Link to="/join">Join</Link>
						</p>
					</div>
				</div>
			</div>
		)
	}
}