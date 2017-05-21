let createNewNote = function () {
	app.post('/createNewNote', function (req, res) {
		let sql = `INSERT INTO notes (userid, title, tags, text, timecreated, draft, public)
		 		   VALUES (?, ?, ?, ?, ?)`

		let userid = req.body.userid;
		let text = req.body.text;
		let title = req.body.title;
		let tags = req.body.tags;
		let timeCreated = new Date().getTime() / 1000;
		let draft = 1
		let public = 0

		connection.query(sql, [userid, title, tags, text, timeCreated, draft, public], function (err, rows, fields) {
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


let modifyNote = function () {
	app.post('/modifyNote', function(req, res){
		let noteid = req.body.id;
		let title = req.body.title;
		let tags = req.body.tags;
		let text = req.body.text;
		let sql = `UPDATE notes SET title = ?, tags = ?, text = ? WHERE id = ?`
		connection.query(sql, [title, tags, text, noteid], function(){})
	})
}
let makeNotePublic = function () {
	app.post('/makeNotePublic', function(req, res){
		let noteid = req.body.id
		let public = req.body.public
		modTemp = new Date().getTime() / 1000;
		//check public-ness first
		if (public == true) {
			let sql = `SELECT id, modified, draft, linkto, public FROM notes WHERE id = ? ORDER BY timecreated DESC`
			connection.query(sql, [noteid], function(err, rows, fields){
				//look for previous public
                if (rows[0].public == 1){
					sql = `UPDATE notes SET title = ?, tags = ?, text = ?, modified = ? WHERE
						`
				}else{
                	idTemp = rows[0].id;
                	titleTemp = rows[0].title;
                	tagTemp = rows[0].tags;
                	textTemp = rows[0].text;
                	draftTemp = 0;
                	publicTemp = 1;
                	sql = `INSERT INTO notes (linkto, userid, title, tags, text, draft, public)
		 		   VALUES (?, ?, ?, ?, ?)`
					connection.query(sql, [idTemp, idTemp])
				}
			})

		}
	})
}

module.exports = {
	createNewNote: createNewNote(),
	fetchAllUserNotes: fetchAllUserNotes(),
	modifyNote: modifyNote()
}