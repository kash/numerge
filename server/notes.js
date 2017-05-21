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
		let sql = `SELECT id, title, text, uuid, tags, timecreated, public, draft FROM notes WHERE userid = ?`
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
						timecreated: i['timecreated'],
						publicNote: i['public'],
						draft: i['draft']
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

let fetchSingleNote = function(){
	app.post('/fetchSingleNote', function (req, res) {
		let uuid = req.body.uuid
		let sql = `SELECT id, title, text, uuid, tags, timecreated, public, draft FROM notes WHERE uuid = ?`
		connection.query(sql, [uuid], function (err, rows, fields) {
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
						timecreated: i['timecreated'],
						publicNote: i['public'],
						draft: i['draft']
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

let makeNotePublic = function () {
	app.post('/makeNotePublic', function (req, res) {
		let noteid = req.body.id
		let pub = req.body.public

		if (pub){
		    let sql = `SELECT public FROM notes WHERE id = ?`
            connection.query(sql, [noteid], function(err, rows, fields){
                priv = rows[0].public;
                if (priv == 1){
                    //do nothing
                }else{
                    sql = `UPDATE notes SET public = 1`
                    connection.query(sql)
                }
            })
        }else{
            let sql = `SELECT public FROM notes WHERE id = ?`
            connection.query(sql, [noteid], function(err, rows, fields){
                priv = rows[0].public;
                if (priv == 0){
                    //do nothing
                }else{
                    sql = `UPDATE notes SET public = 0`
                    connection.query(sql)
                }
            })
        }
    })
}

let noteViewsIncrement = function () {
    app.use('/noteViewsIncrement', function(req, res) {
        let id = req.body.id
        let sql = `UPDATE notes SET views = views + 1 WHERE id = ? `
        connection.query(sql, [id]);
        res.end();
    })
}

let deleteNote = function(){
	app.use('/deleteNote', function(req, res) {
		let id = req.body.id
		let sql = `DELETE FROM notes WHERE id = ?`
		connection.query(sql, [id]);
		res.end();
	})
}

module.exports = {
    createNewNote: createNewNote(),
    fetchAllUserNotes: fetchAllUserNotes(),
    modifyNote: modifyNote(),
    makeNotePublic: makeNotePublic(),
	deleteNote: deleteNote(),
	fetchSingleNote: fetchSingleNote()
}