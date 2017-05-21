function generateUUID() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i = 0; i < 6; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

let createNewNote = function () {
	app.post('/createNewNote', function (req, res) {
		let sql = `INSERT INTO notes (userid, title, tags, text, timecreated, uuid)
		 		   VALUES (?, ?, ?, ?, ?, ?)`

		let userid = req.body.userid;
		let text = req.body.text;
		let title = req.body.title;
		let tags = req.body.tags;
		let timeCreated = new Date().getTime() / 1000;
		let uuid = generateUUID();

		connection.query(sql, [userid, title, tags, text, timeCreated, uuid], function (err, rows, fields) {
			sql = `SELECT id FROM notes WHERE userid = ? ORDER BY timecreated DESC LIMIT 1`;
			connection.query(sql, [userid], function (err, rows, fields) {
				res.json({
					id: rows[0].id
				})
			})
		})
	})
}

let fetchAllUserNotes = function () {
	app.post('/fetchAllUserNotes', function (req, res) {
		let userid = req.body.userID
		let sql = `SELECT * FROM notes WHERE userid = ?`
		connection.query(sql, [userid], function (err, rows, fields) {
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

			res.json({
				"title": title,
				"text": text,
				"tags": tags,
				"timecreated": timecreated,
				"modified": modified
			})
		})
	})

}

let fetchAllUserNotes = function () {
	app.post('/fetchAllUserNotes', function (req, res) {
		let userid = req.body.userID
		let sql = `SELECT id, title, text, uuid, tags, timecreated FROM notes WHERE userid = ?`
		connection.query(sql, [userid], function (err, rows, fields) {
			let output = [];
			if (rows.length > 0) {
				for (let s in rows) {
					let i = rows[s];
					let temp = {
						title: i['title'],
						id: i['id'],
						text: i['text'],
						tags: i['tags'],
						uuid: i['uuid'],
						timecreated: i['timecreated']
					}
					output.push(temp);
				}
				res.json(output);
			} else {
				res.json(null)
			}
		});
	});
}

let modifyNote = function () {
	app.post('/modifyNote', function (req, res) {
		let noteid = req.body.id;
		let title = req.body.title;
		let tags = req.body.tags;
		let text = req.body.text;
		let time = new Date().getTime() / 1000;
		let sql = `UPDATE notes SET title = ?, tags = ?, text = ?, modified = ? WHERE id = ?`
		connection.query(sql, [title, tags, text, time, noteid])
	})
}

let makeNotePublic = function () {
	app.post('/makeNotePublic', function (req, res) {
		let noteid = req.body.id
		let pub = req.body.public
		modTemp = new Date().getTime() / 1000;
		//check public-ness first
		if (pub) {
			let sql = `SELECT linkto, id, text, title, tags, userid, timecreated FROM notes WHERE id = ?`
			connection.query(sql, [noteid], function (err, rows, fields) {
				let linkto = rows[0].linkto;
				let id = rows[0].id;
				let text = rows[0].text;
				let title = rows[0].title;
				let tags = rows[0].tags;
				let userid = rows[0].userid;
				let timecreated = rows[0].timecreated;

				// never public before
				if (linkto == null) {
					sql = `INSERT INTO notes (id, text, title, tags, userid, timecreated, public, draft)
                            VALUES(?, ?, ?, ?, ?, ?, ?, ?)`
					connection.query(sql, [id, text, title, tags, userid, timecreated, 1, 1])
				} else {
					sql = `DELETE FROM notes WHERE id = ?`
					connection.query(sql, [linkto]);
				}
				sql = `INSERT INTO notes (userid, title, tags, text, draft, public, timecreated) VALUES (?, ?, ?, ?, ?)`
				connection.query(sql, [id, title, tags, text, 1, 1, timecreated], function (err, rows, fields) {
					// get id of ^ that new note
					sql = 'SELECT id, linkto FROM notes WHERE id = ? ORDER BY timecreated DESC'
					connection.query(sql, [id], function (err, rows, fields) {
						id = rows[0].id;
						sql = `UPDATE notes SET linkto = ? WHERE id = ? OmRDER BY timecreated DESC`
						connection.query(sql, [id, id])
					})
				})
			});

		} else {
			let sql = `SELECT public FROM notes WHERE id = ?`
			connection.query(sql, [noteid], function (err, rows, field) {
				let pub = rows[0].public;
				if (pub == 1) {
					sql = `DELETE FROM notes WHERE id = ?`
					connection.query(sql, [noteid])
				}

			})
		}
	})
}
module.exports = {
	createNewNote: createNewNote(),
	fetchAllUserNotes: fetchAllUserNotes(),
	modifyNote: modifyNote(),
	makeNotePublic: makeNotePublic()
}