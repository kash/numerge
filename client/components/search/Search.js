import React from 'react';
import SingleNote from '../notes/SingleNote';
import axios from 'axios';

export default class Search extends React.Component {
	constructor() {
		super();
		this.state = {
			search: "",
			output:  (
				<div className="search-empty">
					<img src="/client/images/search-empty.svg" alt=""/>
					<p><strong>Did you know:</strong> You're awesome</p>
				</div>
			)
		}
	}

	handleChange(key, value) {
		this.setState({
			[key]: value
		});
		if (!value) {
			this.setState({
				output: (
					<div className="search-empty">
						<img src="/client/images/search-empty.svg" alt=""/>
						<p><strong>Did you know:</strong> You're awesome</p>
					</div>
				)
			})
		} else {
			axios.post('/requestSearch', {
				search: value
			}).then(function (response) {
				if (response.data.empty) {
					this.setState({
						output: (
							<div className="search-empty">
								<img src="/client/images/search-empty.svg" alt=""/>
								<p><strong>Did you know:</strong> You're awesome</p>
							</div>
						)
					})
				} else {
					let output = [];
					for (let i in response.data) {
						output.push(
							<SingleNote info={response.data[i]}/>
						)
					}
					this.setState({
						output: output
					})
				}

			}.bind(this))
		}
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