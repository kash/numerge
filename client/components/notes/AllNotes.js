import React from 'react';
import {Link} from 'react-router';
import SingleNote from './SingleNote';
import {connect} from 'react-redux';
import {fetchAllUserNotes} from '../../actions/notes';

@connect(function(store){
	return {
		userInfo: store.user.info,
		notes: store.notes.userNotes
	}
})

export default class AllNotes extends React.Component {
	constructor() {
		super();
	}

	componentWillLoad(){
		this.props.dispatch(fetchAllUserNotes(this.props.userInfo.id));
	}

	render() {
		if (this.props.notes != null){
			let notes = (
				<div className="empty-notes">
					<p>No notes here :(</p>

					<Link to="/notes/new" className="common-button">
						Create a Note
					</Link>
				</div>
			);
			if (this.state.notes != null && this.state.notes.length > 0){
				notes = [];
				for (let note in this.props.notes){
					notes.push(<SingleNote information={note}/>)
				}
			}
			return (
				<div className="all-notes notes">
					<h1>All Notes</h1>
					{notes}
				</div>
			)
		}else{
			return null;
		}
	}
}