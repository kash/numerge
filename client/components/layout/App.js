import React from 'react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import {connect} from 'react-redux';
import {fetchUserInformation} from '../../actions/user';

@connect(function (store) {
	return {
		info: store.user.info
	}
})

export default class App extends React.Component {
	constructor() {
		super();
	}

	componentWillMount() {
		this.props.dispatch(fetchUserInformation());
	}

	render() {
		let route = this.props.route;
		let nav = route.hideNav ? null : <NavigationBar/>;
		let footer = route.hideFooter ? null : <Footer/>;
		if (route.whiteNav && nav != null){
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