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
			timeout: null
		}
	}

	componentWillMount() {
		axios.post('/fetchSingleNote', {

		}).then(function(response){

		})

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
							publicNote: v['public']
						})
						break;
					}
				}
			}
		}.bind(this)));
	}

	render() {

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
			</div>
		)
	}
}