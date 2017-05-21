/**
 * Fetches information about user
 */
let fetchUserInformation = function () {
	app.post('/fetchUserInformation', function (req, res) {
		let user = req.body.userID;
		let sql = `SELECT id, username, joined, uuid, location, bio, 
                firstname, lastname FROM users WHERE id = ?`;

		if (user == null) {
			sql = `SELECT id, username, joined, uuid, location, bio, 
                firstname, lastname FROM users WHERE uuid = ?`;
		}

		if (req.cookies.uuid == null) {
			res.json({
				error: true
			});
			res.end();
		} else {
			user = req.cookies.uuid;

			connection.query(sql, [user], function (err, rows, field) {
				if (rows.length > 0) {
					res.json({
						id: rows[0].id,
						username: rows[0].username,
						email: rows[0].email,
						fistname: rows[0].firstname,
						lastname: rows[0].lastname,
						joined: rows[0].joined,
						uuid: rows[0].uuid,
						location: rows[0].location,
						bio: rows[0].bio,
						error: null
					});
				} else {
					res.json({
						error: true
					})
				}
			});
		}
	});
}

module.exports = {
	fetchUserInformation: fetchUserInformation()
}