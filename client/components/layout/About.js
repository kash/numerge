import React from 'react';

export default class About extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="about">
				<div>
					<h1>A little about Numerge</h1>
					<p>It's a cool app.</p>
				</div>
				<div>
					<h1>A little <em>more</em> about Numerge</h1>
					<p>Wouldn't it be nice if you could see your classmates notes? What if
						you could see last years' class' notes? Numerge is a place where a
						community of note-takers can come together and share their notes.
						You can, of course, set your notes to private. But you can also
						share them with the world!</p>
					<p>Notes a categorized using tagging. For example, a note tagged as
						#school/biology/anatomy would show up any time someone searches
						for school, biology, or anatomy.</p>
					<p>Created using Javascript and love. At
						<a href="https://codeday.org">Code Day</a>. By Kash Goudarzi and
						Gifton Okoronkwo.</p>
				</div>
			</div>
		)
	}
}