import React from 'react';

export default class NotFound extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="fourzerofour">
				<div>
					<h1>Oh no!</h1>
					<h2>This page doesn't exist! Here are some plates.</h2>
					<img src="/client/images/plates.svg" alt=""/>
				</div>
			</div>
		)
	}
}