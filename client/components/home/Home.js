import React from 'react';
import {Link} from 'react-router';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			topDisplayText: "This is a note taking app. All it does, really, is this and that and machine learning lol bishass",
			displayThis: ""
		}
	}

	componentDidMount() {
		let topText = this.state.topDisplayText;
		let counter = 0;
		var interval = setInterval(function () {
			if (topText[counter] != null) {
				let current = this.state.displayThis;
				let output = current + topText[counter];
				this.setState({
					displayThis: output
				})
				counter++;
			} else {
				clearInterval(interval);
			}
		}.bind(this), 70);
	}

	render() {
		return (
			<div className="home">
				<div className="top-display">
					<div className="top-display-left">
						<div>
							<h1>Numerge</h1>
							<h2>Share your notes with the world.</h2>
							<Link to="/join" className="common-button">Join Now</Link>
						</div>
					</div>
					<div className="top-display-right">
						<div className="top-display-note">
							{this.state.displayThis}
						</div>
					</div>
				</div>
				<main>
					<div className="simple">
						<div>
							<div className="row">
								<div>
									<h1>It's Simple. Seriously.</h1>
									<p>We've minimized distractions by removing any unneeded tabs,
										buttons, and links. It's just you and your notes.</p>
								</div>
								<div className="row-center">
									<img src="/client/images/home-simple.png" alt=""/>
								</div>
							</div>
						</div>
					</div>
					<div className="search">
						<div>
							<div className="row">
								<div className="row-center">
									<img src="/client/images/home-search.png" alt=""/>
								</div>
								<div>
									<h1>Search our <em>massive</em> database of notes</h1>
								</div>
							</div>
						</div>
					</div>
					<div className="join">
						<div>
							<div className="center">
								<h1>Not really sure what you're waiting for.</h1>
								<Link to="/join" className="common-button">Join dawg</Link>
							</div>
						</div>
					</div>
				</main>
			</div>
		)
	}
}