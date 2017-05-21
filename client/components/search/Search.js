import React from 'react';
import SingleNote from '../notes/SingleNote';
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
		if (!value){
			this.setState({
				output: null
			})
		}else{
			axios.post('/requestSearch', {
				search: value
			}).then(function(response){
				if (response.data.empty){
					this.setState({
						output: null
					})
				}else{
					let output = [];
					for (let i in response.data){
						console.log(response.data[i]);
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