import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchUserInformation} from '../../actions/user';
import {fetchAllUserNotes} from '../../actions/notes';
import Tag from '../notes/Tag';


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
			title: "",
			text: "",
			tags: "",
			id: ""
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
							publicNote: v['public']
						})
						break;
					}
				}
			}
		}.bind(this)));
	}

	render() {

		let tags = this.state.tags;
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

		return (
			<div className="view-note">
				<h1>{this.state.title}</h1>
				<div className="tags">
					{tagsOutput}
				</div>
				<p>{this.state.text}</p>
			</div>
		)
	}
}