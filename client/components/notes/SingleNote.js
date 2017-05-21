import React from 'react';

export default class Login extends React.Component {
	constructor() {
		super();
		this.state = {

		}
	}

	handleChange(key, value){
		this.setState({
			[key]: value
		})
	}

	render() {
		return (
			<div className="single-note">
				{this.props.information}
			</div>
		)
	}
}