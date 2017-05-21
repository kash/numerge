import React from 'react';
import {Link} from 'react-router';

export default class NotesLayout extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className={this.props.route.appClassName}>
				<div className="notes-layout">
					<div className="notes-nav">
						<div className="notes-nav-fixed">
							<Link to="/">
								<img src="/client/images/logo-white.png" alt=""/>
							</Link>
							<div className="nav-links">
								<Link to="/notes">All Notes</Link>
								<Link to="/notes/new">New Note</Link>
								<Link to="/notes/settings">Settings</Link>
								<Link target="__blank" to="/search">Search
									<img src="/client/images/link-away.svg" alt=""/></Link>
							</div>
							<button className="logout">
								<img src="/client/images/logout.svg" alt=""/>
							</button>
						</div>

					</div>
					<div className="notes-container">
						{this.props.children}
					</div>
				</div>
			</div>
		)
	}
}