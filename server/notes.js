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
module.exports = {
	createNewNote: createNewNote()
}