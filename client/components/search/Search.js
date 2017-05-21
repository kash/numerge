import React from 'react';
import Result from './Result';
import axios from 'axios';

export default class Search extends React.Component {
	constructor() {
		super();
		this.state = {
			search: "",
			output: []
		}
	}

	handleChange(key, value){
		this.setState({
			[key]: value
		});
		axios.post('/requestSearch', {
			search: value
		}).then(function(response){
			console.log(response);
		})
	}

	render() {

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
					{this.state.output}
				</div>
			</div>
		)
	}
}