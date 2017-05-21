let requestSearch = function () {
	app.post('/requestSearch', function (req, res) {
		let searchPre = req.body.search;
		let sql = `SELECT * FROM notes WHERE (title LIKE '%${searchPre}%') OR (tags LIKE '%${searchPre}%')`;
		if (searchPre.indexOf(" ") > -1) {
			let searchArray = searchPre.split(" ");
			for (let s in searchArray){
				sql += ` (OR tags LIKE '%${s}%')`;
			}
		}

		connection.query(sql, [searchPre], function (err, rows, fields) {
			if (rows != null && rows.length > 0) {
				let output = [];
				for (let k in rows) {
					output.push(rows[k]);
				}
				res.json(output);
			} else {
				res.json({
					empty: true
				})
			}
		})
	})
}

module.exports = {
	requestSearch: requestSearch()
}
