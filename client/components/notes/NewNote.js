import React from 'react';

export default class NewNote extends React.Component {
	constructor() {
		super();
		this.state = {
			text: "",
			title: "",
			tags: ""
		}
	}

	handleChange(key, value){
		this.setState({
			[key]: value
		})
	}

	render() {
		return (
			<div className="new-note notes">
				<h1>New Note</h1>
				<input placeholder="Title" type="text" onChange={(e) => this.handleChange("title", e.target.value)}/>
				<input placeholder="Tags" type="text" onChange={(e) => this.handleChange("tags", e.target.value)}/>
				<textarea onChange={(e) => this.handleChange("text", e.target.value)}
						  value={this.state.text}
				placeholder="Note"></textarea>
			</div>
		)
	}
}