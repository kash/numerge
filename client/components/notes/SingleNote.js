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
		let tagsArray = tags.split(' ');
		let tagsOutput = [];
		for (let s in tagsArray){
			tagsOutput.push(
				<div>{tagsArray[s]}</div>
			)
		}

		if (tags.length == 0){
			tagsOutput = null;
		}

		let title = <em>No Title</em>;
		if (this.props.info.title.length > 0){
			title = this.props.info.title;
		}
		if (this.props.info.text.length == 0){
			text = <em>No note</em>;
		}

		let edit = (
			<Link to={"/notes/" + this.props.info.uuid} className="edit-button">
				Edit Note
			</Link>

		)
		if (!this.props.editable){
			edit = null;
		}

		return (
			<Link target={this.props.editable ? "" : "__blank"} to={"/note/" + this.props.info.uuid} className="single-note">
				<div className="first-line">
					<h2>{title}</h2>
				</div>
				<div className="tags">
					{tagsOutput}
				</div>
				<div className="single-text">
					<p>{text}</p>
				</div>
				{edit}
				<p className="created">Created {date}</p>
			</Link>
		)
	}
}