let requestSearch = function () {
	app.post('/requestSearch', function (req, res) {
		let searchPre = req.body.search
		let searchPost = searchPre.split(" ");
		for (let searching in searchPost) {
			let searchString = searchPost[searching]
			let sql = `SELECT * FROM notes WHERE tags LIKE %?%`
			connection.query(sql, [searchString], function (err, rows, fields) {
				if (rows.length > 0) {
					let output = [];
					for (let k in rows) {
						let temp = {...rows[k]}
						output.push(temp);
					}
					res.json(output);
				} else {
					res.json({
						empty: true
					})
				}
			})
		}
	})
}

module.exports = {
	requestSearch: requestSearch()
}
