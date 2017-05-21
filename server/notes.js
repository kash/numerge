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
	app.post('/fetchAllUserNotes', function (req, res){
		let userid = req.body.userID
		let sql = `SELECT id, title, text, uuid, tags, timecreated FROM notes WHERE userid = ?`
		connection.query(sql, [userid], function(err, rows, fields){
			let output = [];
			if (rows.length > 0){
				for (let s in rows){
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
			}else{
				res.json(null)
			}
		});
	});
}

let modifyNote = function () {
	app.post('/modifyNote', function(req, res){
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
	app.post('/makeNotePublic', function(req, res){
		let noteid = req.body.id
		modTemp = new Date().getTime() / 1000;
		//check public-ness first
		if (public == true) {
			let sql = `SELECT id, modified, draft, linkto, public FROM notes WHERE id = ? ORDER BY timecreated DESC`
			connection.query(sql, [noteid], function(err, rows, fields){
				//look for previous public
                if (rows[0].public == 1){
					sql = `UPDATE notes SET title = ?, tags = ?, text = ?, modified = ? WHERE`
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