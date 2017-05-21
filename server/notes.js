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

let makeNotePublic = function () {
	app.post('/makeNotePublic', function (req, res) {
		let noteid = req.body.id
		let pub = req.body.public
		let modTemp = new Date().getTime() / 1000;
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

<<<<<<< HEAD
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
=======
				// never public before
				if (linkto == null) {
					sql = `INSERT INTO notes (text, title, tags, userid, timecreated, public, draft)
                            VALUES(?, ?, ?, ?, ?, ?, ?)`
					connection.query(sql, [text, title, tags, userid, timecreated, 1, 1])
				} else {
					sql = `DELETE FROM notes WHERE id = ?`
					connection.query(sql, [linkto]);
				}
				sql = `INSERT INTO notes (userid, title, tags, text, draft, public, timecreated) VALUES (?, ?, ?, ?, ?)`
				connection.query(sql, [userid, title, tags, text, 1, 1, timecreated], function (err, rows, fields) {
					// get id of ^ that new note
					sql = 'SELECT id, linkto FROM notes WHERE id = ? ORDER BY timecreated DESC'
					connection.query(sql, [id], function (err, rows, fields) {
						id = rows[0].id;
						sql = `UPDATE notes SET linkto = ? WHERE id = ? ORDER BY timecreated DESC`
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
		res.end();
	})
>>>>>>> client
}

let noteViewsIncrement = function () {
    app.use('/noteViewsIncrement', function(res, req) {
        id = req.body.id
        let sql = `UPDATE notes SET views = views + 1 WHERE id = ? `
        connection.query(sql, [id])
    })
}

module.exports = {
<<<<<<< HEAD
    createNewNote: createNewNote(),
    fetchAllUserNotes: fetchAllUserNotes(),
    modifyNote: modifyNote(),
    makeNotePublic: makeNotePublic()
=======
	createNewNote: createNewNote(),
	fetchAllUserNotes: fetchAllUserNotes(),
	modifyNote: modifyNote(),
	makeNotePublic: makeNotePublic()
>>>>>>> client
}