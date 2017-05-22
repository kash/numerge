

import React from 'react';

export default class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			privateSwitch: false,
			loaded: false
		}
	}

	flipSwitch(value){
		this.setState({
			[value]: !this.state[value]
		})
		this.props.onChange(!this.state[value]);
	}

	componentDidMount(){
		if (this.props.on == 'on'){
			this.setState({
				privateSwitch: true
			})
		}
	}

	render() {
		let name = "flip-switch" + (this.state.privateSwitch ? " flip-switch-on" : "");

		return (
			<button onClick={(e) => this.flipSwitch("privateSwitch")}
					className={name}>
				<div></div>
			</button>
		)
	}
}