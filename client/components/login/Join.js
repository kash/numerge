import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

@connect(function (store) {
	return {
		info: store.user.info
	}
})

export default class Join extends React.Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			confirm: "",
			error: "",
			username: "",
			pass8: false,
			passNum: false,
			passCap: false
		}
	}

	handleChange(key, value) {

		if (key == 'password') {
			if (value.length >= 8) this.setState({pass8: true});
			else this.setState({pass8: false});

			if (/\d/.test(value)) this.setState({passNum: true});
			else this.setState({passNum: false});

			if (/[A-Z]/.test(value)) this.setState({passCap: true});
			else this.setState({passCap: false});
		}
		this.setState({
			[key]: value
		})
	}

	sendRequest() {
		if (this.state.pass8 && this.state.passNum && this.state.passCap) {
			if (this.state.password === this.state.confirm) {
				axios.post('/userJoinRequest', {
					email: this.state.email,
					password: this.state.password,
					username: this.state.username
				}).then(function (response) {
					switch (response.data.error) {
						case "username":
							this.setState({
								error: "This username is already associated with an account"
							})
							break;
						case "email":
							this.setState({
								error: "This email is already associated with an account"
							});
							break;
						case null:
							browserHistory.push('/notes');
							break;
						default:
							this.setState({error: "Something went wrong.. Please refresh page and try again"})
							break;

					}
					console.log(response);
				}.bind(this));
			} else {
				this.setState({error: "Passwords do not match"});
			}
		} else {
			this.setState({
				error: "Weak password"
			})
		}
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

		let pass8Style = {opacity: this.state.pass8 ? 1 : 0.5}
		let passNumStyle = {opacity: this.state.passNum ? 1 : 0.5}
		let passCapStyle = {opacity: this.state.passCap ? 1 : 0.5}

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
						<legend>Username</legend>
						<input type="text"
							   onChange={(e) => this.handleChange("username", e.target.value)}
							   value={this.state.username}/>
					</div>
					<div>
						<legend>Password</legend>
						<input type="password"
							   onChange={(e) => this.handleChange("password", e.target.value)}
							   value={this.state.password}/>
					</div>

					<div>
						<legend>Confirm Password</legend>
						<input type="password"
							   onChange={(e) => this.handleChange("confirm", e.target.value)}
							   value={this.state.confirm}/>
						<p className="password-checker">
							<span style={pass8Style}>8 characters.</span>
							<span style={passNumStyle}> 1 number.</span>
							<span style={passCapStyle}> 1 capital.</span>
						</p>
						<p className="login-error" style={displayError}>{this.state.error}</p>
					</div>
					<div>
						<button className="common-button" onClick={this.sendRequest.bind(this)}>
							Join
						</button>
						<p className="already">Already have an account?
							<Link to="/login"> Login</Link>
						</p>
					</div>
				</div>
			</div>
		)
	}
}