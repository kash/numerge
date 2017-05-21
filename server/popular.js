let showPopular = function () {
	app.post('/showPopular', function (req, res) {
		sql = `SELECT id, title, text, tags, timecreated, uuid FROM notes DESC LIMIT = 10`
		connection.query(sql, function (err, rows, fields) {
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
		})
	})
}

module.exports = {
	showPopular: showPopular()
}