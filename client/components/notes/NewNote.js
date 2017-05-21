import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

@connect(function (store) {
	return {
		userInfo: store.user.info
	}
})

export default class NewNote extends React.Component {
	constructor() {
		super();
		this.state = {
			text: "",
			title: "",
			tags: "",
			firstSave: false,
			id: null
		}
	}

	handleChange(key, value) {
		this.setState({
			[key]: value
		})
		if (!this.state.firstSave) {
			axios.post('/createNewNote', {
				userid: this.props.userInfo.id,
				text: this.state.text,
				title: this.state.title,
				tags: this.state.tags
			}).then(function (response) {
				this.setState({id: response.data.id});
			}.bind(this));
			this.setState({
				firstSave: false
			});

			setInterval(function () {
				axios.post('/modifyPost', {
					userid: this.props.userInfo.id,
					text: this.state.text,
					title: this.state.title,
					tags: this.state.tags,
					id: this.state.id
				});

				console.log('hi');
			}, 1000);
		}
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