import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchAllUserNotes} from '../../actions/notes';

@connect(function (store) {
	return {
		userInfo: store.user.info,
		notes: store.notes.userNotes
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
			id: null,
			timeout: null
		}
	}

	componentWillMount() {
		this.props.dispatch(fetchAllUserNotes(this.props.userInfo.id, function () {
			if (this.props.routeParams.uuid && this.props.notes != null) {
				for (let k in this.props.notes) {
					let v = this.props.notes[k];
					if (v['uuid'] === this.props.routeParams.uuid) {
						this.setState({
							title: v['title'],
							text: v['text'],
							tags: v['tags'],
							id: v['id']
						})
						break;
					}
				}
			}
		}.bind(this)));
	}

	handleChange(key, value) {
		clearTimeout(this.state.timeout);
		this.setState({
			[key]: value,
			timeout: null
		})
		if (!this.state.firstSave && !this.props.routeParams.uuid) {
			this.setState({
				firstSave: true
			});
			axios.post('/createNewNote', {
				userid: this.props.userInfo.id,
				text: this.state.text,
				title: this.state.title,
				tags: this.state.tags
			}).then(function (response) {
				this.setState({id: response.data.id});
			}.bind(this));
		}

		let timeout = setTimeout(function () {
			axios.post('/modifyNote', {
				userid: this.props.userInfo.id,
				text: this.state.text,
				title: this.state.title,
				tags: this.state.tags,
				id: this.state.id
			});
		}.bind(this), 1000);
		this.setState({
			timeout: timeout
		})
	}

	render() {
		let newNote = true;
		if (this.props.routeParams.uuid) {
			newNote = false;
		}

		let header = (
			<h1>New Note</h1>
		);
		if (!newNote) {
			header = (
				<h1>Edit Note</h1>
			)
		}

		return (
			<div className="new-note notes">
				{header}
				<input value={this.state.title} placeholder="Title" type="text" onChange={(e) => this.handleChange("title", e.target.value)}/>
				<input value={this.state.tags} placeholder="Tags" type="text" onChange={(e) => this.handleChange("tags", e.target.value)}/>
				<textarea onChange={(e) => this.handleChange("text", e.target.value)}
						  value={this.state.text}
						  placeholder="Note"></textarea>
			</div>
		)
	}
}