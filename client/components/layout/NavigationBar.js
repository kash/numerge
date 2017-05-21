import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

@connect(function(store){
	return {
		info: store.user.info
	}
})

export default class NavigationBar extends React.Component {
	constructor() {
		super();
	}

	render() {
		let img = "/client/images/logo.png";
		if (this.props.whiteNav){
			img = "/client/images/logo-white.png";
		}

		let links = (
			<ul className="nav-ul">
				<li><Link to={"/about"}>About</Link></li>
				<li><Link to={"/login"}>Login</Link></li>
				<li><Link to={"/join"}>Join</Link></li>
			</ul>
		);
		console.log(this.props);
		if (this.props.info.firstname > 0){
			<ul className="nav-ul">
				<li><Link to={"/about"}>About</Link></li>
				<li><Link to={"/notes"}>Notes</Link></li>
			</ul>
		}
		return (
			<nav className={this.props.whiteNav ? "white-nav" : null}>
				<div className="nav-content">
					<div>
						<Link to={"/"}>
							<img src={img} alt="Logo"/>
						</Link>
					</div>
					<div className="nav-ul-wrapper">
						{links}
					</div>
				</div>
			</nav>
		)
	}
}