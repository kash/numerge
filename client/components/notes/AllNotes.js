import React from 'react';
import {Link} from 'react-router';
import SingleNote from './SingleNote';
import {connect} from 'react-redux';

@connect(function (store) {
	return {
		userInfo: store.user.info,
		notes: store.notes.userNotes
	}
})

export default class AllNotes extends React.Component {
	constructor() {
		super();
	}

	render() {
		let notes = (
			<div className="empty-notes">
				<div>
					<img src="/client/images/milk.svg" alt=""/>
					<p>You don't have any notes!</p>

				</div>

				<Link to="/notes/new" className="common-button">
					Create a Note
				</Link>
			</div>
		);
		if (this.props.notes != null && this.props.notes.length > 0) {
			notes = [];
			for (let note in this.props.notes) {
				notes.push(<SingleNote editable="true" info={this.props.notes[note]}/>)
			}
		}
		return (
			<div className="all-notes notes">
				<h1>All Notes</h1>
				{notes}
			</div>
		)
	}
}
