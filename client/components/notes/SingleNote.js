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
		let text = this.props.info.text;

		if (text.length > 200){
			var trimmedString = text.substr(0, 200);
			text = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + "...";
		}

		let date = new Date(this.props.info.timecreated);
		date = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();

		let tags = this.props.info.tags;
		let tagsArray = tags.split(',');
		let tagsOutput = [];
		for (let s in tagsArray){
			tagsOutput.push(
				<div>{tagsArray[s]}</div>
			)
		}

		return (
			<Link to={"/notes/" + this.props.info.uuid} className="single-note">
				<div className="first-line">
					<h2>{this.props.info.title}</h2>
				</div>
				<div className="tags">
					{tagsOutput}
				</div>
				<div className="single-text">
					<p>{text}</p>
				</div>

				<p className="created">Created {date}</p>
			</Link>
		)
	}
}