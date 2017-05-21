import React from 'react';
import Result from './Result';

export default class Search extends React.Component {
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

		let output = [];
		for (let i = 0; i < 5; i++){
			output.push(<Result/>);
		}

		return (
			<div className="search">
				<div className="search-top">
					<div>
						<h1>Search for notes</h1>
						<input type="text"
							   onChange={(e) => this.handleChange("search", e.target.value)}
							   value={this.state.search}/>
					</div>
				</div>
				<div className="search-results">
					{output}
				</div>
			</div>
		)
	}
}