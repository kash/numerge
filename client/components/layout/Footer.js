import React from 'react';

export default class Footer extends React.Component {
	constructor() {
		super();
	}

	render() {
		let style = {
			alignSelf: "flex-start"
		}
		return (
			<div className="footer">
				<p>
					we have no footer because this was made at a hackathon and time is money
				</p>
			</div>
		)
	}
}