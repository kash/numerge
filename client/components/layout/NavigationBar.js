import React from 'react';
import {Link} from 'react-router';

export default class NavigationBar extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<nav>
				<div className="nav-content">
					<div>
						<Link to={"/"}>
							<img src={} alt="Logo"/>
						</Link>
					</div>
					<div className="nav-ul-wrapper">
						<ul className="nav-ul">
							<li><Link to={"/"}>Home</Link></li>
						</ul>
					</div>
				</div>
			</nav>
		)
	}
}