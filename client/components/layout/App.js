import React from 'react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

export default class App extends React.Component {
	constructor() {
		super();
	}

	render() {
		let route = this.props.route;
		let nav = route.hideNav ? null : <NavigationBar/>;
		let footer = route.hideFooter ? null : <Footer/>;
		if (route.whiteNav){
			nav = <NavigationBar whiteNav="true"/>
		}
		return (
			<div className={this.props.route.appClassName}>
				{nav}
				{this.props.children}
				{footer}
			</div>
		)
	}
}