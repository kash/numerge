import React from 'react';

export default class Settings extends React.Component {
	constructor() {
		super();
	}

	handleChange(key, value){
		this.setState({
			[key]: value
		})
	}

	render() {
		return (
			<div className="notes settings">
				<h1>Settings</h1>
				<div className="settings-wrapper">
					<div className="set-box">
						<h2>My Information</h2>
						<div className="set-row">
							<div className="set-set">
								<legend>First Name</legend>
								<input type="text"/>
							</div>
							<div className="set-set">
								<legend>Last Name</legend>
								<input type="text"/>
							</div>
						</div>
						<div className="set-row">
							<div className="set-set">
								<legend>First name</legend>
								<input type="text"/>
							</div>
							<div className="set-set">
								<legend>First name</legend>
								<input type="text"/>
							</div>
						</div>
					</div>
					<div className="set-box">
						<h2>General Settings</h2>
						<div className="set-row">
							<div className="set-set">
								<legend>Private</legend>

							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}