import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {fetchUserInformation} from '../../actions/user';
import {fetchAllUserNotes} from '../../actions/notes';
import Tag from '../notes/Tag';
import {fetchSingleNote} from '../../actions/notes';


@connect(function (store) {
	return {
		userInfo: store.user.info,
		notes: store.notes.userNotes
	}
})

export default class ViewNote extends React.Component {
	constructor() {
		super();
		this.state = {
			title: "",
			text: "",
			tags: "",
			id: "",
			loaded: false
		}
	}

	componentWillMount() {

		axios.post('/fetchSingleNote', {
			uuid: this.props.routeParams.uuid
		}).then(function (response) {
			let v = response.data[0];
			this.setState({
				title: v['title'],
				text: v['text'],
				tags: v['tags'],
				id: v['id'],
				publicNote: v['public'],
				loaded: true
			})
		}.bind(this));
	}

	render() {
		if (this.state.loaded) {

			let tags = this.state.tags;
			let tagsOutput = [];
			if (tags) {
				let tagsArray = tags.split(' ');
				for (let s in tagsArray) {
					tagsOutput.push(
						<div>{tagsArray[s]}</div>
					)
				}

				if (tags.length == 0) {
					tagsOutput = null;
				}
			}else{
				tagsOutput.push(tags);
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
		} else {
			return null;
		}
	}
}