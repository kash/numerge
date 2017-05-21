import React from 'react';
import {Link} from 'react-router';

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
			<div className="tag">
				<p>{this.props.tagName}</p>
				<button className="close-tag">X</button>
			</div>
		)
	}
}