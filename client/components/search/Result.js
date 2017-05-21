import React from 'react';

export default class Request extends React.Component {
	constructor() {
		super();
		this.state = {
			search: ""
		}
	}

	handleChange(key, value){
		this.setState({
			[key]: value
		})
	}

	render() {

		return (
			<div className="search-result">
				<h1>How to do something in JavaScript</h1>
				<div className="tags">
					<div>#css</div>
					<div>#javascript</div>
					<div>#json</div>
				</div>
				<div>By Kash Goudarzi | June 9, 2017</div>
				<div>
					<p>This </p>
				</div>
			</div>
		)
	}
}