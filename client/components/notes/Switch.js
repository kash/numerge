

import React from 'react';

export default class Login extends React.Component {
	constructor() {
		super();
		this.state = {}
	}

	handleChange(key, value) {
		this.setState({
			[key]: value
		})
	}

	render() {
		return (
			<button onClick={(e) => this.flipSwitch("privateSwitch")}
					className={"flip-switch" + this.getSwitch("privateSwitch")}>
				<div></div>
			</button>
		)
	}
}