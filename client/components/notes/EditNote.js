import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchAllUserNotes} from '../../actions/notes';
import Switch from './Switch';

@connect(function (store) {
	return {
		userInfo: store.user.info,
		notes: store.notes.userNotes
	}
})

export default class EditNote extends React.Component {
	constructor() {
		super();
		this.state = {
			text: "",
			title: "",
			tags: "",
			firstSave: false,
			id: null,
			timeout: null,
			publicNote: false,
			loaded: false,
			reallyDelete: false
		}
	}
	
	deleteNote(){
		if (this.state.reallyDelete){
			this.setState({
				reallyDelete: true
			})
		}else{
			let id = this.state.id;
			axios.post("/deleteNote", {
				id: id
			}).then(function(){
				window.location.href = "/notes";
			});
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
							id: v['id'],
							publicNote: v['publicNote'],
							loaded: true
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

	buttonSwitch(e){
		axios.post("/makeNotePublic", {
			id: this.state.id,
			public: e
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
		let tags = this.state.tags;
		let switchButton = null;
		if (this.state.loaded){
			switchButton = (
				<div className="new-note-switch">
					<legend>Make Public</legend>
					<Switch on={this.state.publicNote == 1 ? "on" : "off"} onChange={(e) => this.buttonSwitch(e)}/>
				</div>
			)
		}
		if (!this.state.firstSave && !this.props.routeParams.uuid) {
			switchButton = null;
		}

		let del = (
			<button className="delete-button common-button" onClick={this.deleteNote.bind(this)}>Delete note</button>
		)
		if (this.state.reallyDelete){
			del = (
				<button className="delete-button common-button" onClick={this.deleteNote.bind(this)}>I really want to delete this note</button>
			)
		}

		return (
			<div className="new-note notes">
				<div className="first-line">
					{header}
					{switchButton}
				</div>
				<input value={this.state.title} placeholder="Title" type="text" onChange={(e) => this.handleChange("title", e.target.value)}/>
				<input value={this.state.tags} placeholder="Tags" type="text" onChange={(e) => this.handleChange("tags", e.target.value)}/>
				<textarea onChange={(e) => this.handleChange("text", e.target.value)}
						  value={this.state.text}
						  placeholder="Note"></textarea>
				{del}
			</div>
		)
	}
}