let createNewNote = function () {
	app.post('/createNewNote', function (req, res) {
		let sql = `INSERT INTO notes (userid, title, tags, text, timecreated)
		 		   VALUES (?, ?, ?, ?, ?)`

		let userid = req.body.userid;
		let text = req.body.text;
		let title = req.body.title;
		let tags = req.body.tags;
		let timeCreated = new Date().getTime() / 1000;

		connection.query(sql, [userid, title, tags, text, timeCreated], function (err, rows, fields) {
			sql = `SELECT id FROM notes WHERE userid = ? ORDER BY timecreated DESC`;

			connection.query(sql, [userid], function (err, rows, fields) {
				res.json({
					id: rows[0].id
				})
			})
		})
	})
}

let fetchAllUserNotes = function () {
	app.post('/fetchAllUserNotes', function (req, res){
		let userid = req.body.userID
		let sql = `SELECT * FROM notes WHERE userid = ?`
		connection.query(sql, [userid], function(err, rows, fields){
			//define arrays
			let title = []
			let text = []
			let tags = []
			let timecreated = []
			let modified = []
			for (let i in rows) {
				//loop through info
				let titleTemp = rows[i].title
				let textTemp = rows[i].text
				let tagsTemp = rows[i].tags
				let tcTemp = rows[i].timecreated
				let modTemp = rows[i].modified
				//push to array
				title.push(titleTemp);
				text.push(textTemp);
				tags.push(tagsTemp);
				timecreated.push(tcTemp);
				modified.push(modTemp);
			}

			res.json{
				"title": title,
				"text": text,
				"tags": tags,
				"timecreated": timecreated,
				"modified": modified
			}

		})
	})
}
module.exports = {
	createNewNote: createNewNote(),
	fetchAllUserNotes: fetchAllUserNotes()
}