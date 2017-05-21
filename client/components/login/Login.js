import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

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
			password: ""
		}
	}

	handleChange(key, value) {
		this.setState({
			[key]: value
		})
	}

	sendRequest() {
		axios.post('/userJoinRequest', {
			email: this.state.email,
			password: this.state.password
		}).then(function (response) {
			console.log(response.data);
		})
	}

	render() {
		if (Object.keys(this.props.info).length > 0) {
			if (this.props.user.info.error) {
				browserHistory.push('/notes');
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
					</div>
					<div>
						<button className="common-button"
								onClick={this.sendRequest()}
						>Login</button>
						<p className="already">Don't have an account? <Link to="/join">Join</Link>
						</p>
					</div>
				</div>
			</div>
		)
	}
}