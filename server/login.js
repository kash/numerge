/**
 * Join logic
 */
var bcrypt = require('bcrypt');

function generateUUID() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i = 0; i < 200; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

let userJoinRequest = function () {
	app.post('/userJoinRequest', function (req, res) {
		let username = req.body.username;
		let email = req.body.email;
		let password = req.body.password;
		let time = new Date().getTime() / 1000;

		let sql = `SELECT email FROM users WHERE username = ?`;
		connection.query(sql, [username], function (err, rows, fields) {
			if (rows.length == 0) {

				let sql = `SELECT username FROM users WHERE email = ?`;

				let uuid = generateUUID();

				connection.query(sql, [email], function (err, rows, fields) {
					if (rows.length == 0) {
						let sql = `INSERT INTO users SET email = ?, username = ?, password = ?, uuid = ?, joined = ?`

						bcrypt.hash(password, 10, function (err, hash) {
							connection.query(sql, [email, username, hash, uuid, time]);
							res.cookie('uuid', uuid, {maxAge: time + (10 * 365 * 24 * 60 * 60), httpOnly: true});
							res.json({
								error: null
							})
						});

					} else {
						res.json({
							error: "email"
						})
					}
				})
			} else {
				res.json({
					error: "username"
				})
			}
		})
	});
}

/**
 * Login logic
 */
let userLoginRequest = function () {
	app.post('/userLoginRequest', function (req, res) {
		let email = req.body.email;
		let password = req.body.password;

		let sql = `SELECT password, uuid FROM users WHERE email = ?`
		connection.query(sql, [email], function (err, rows, fields) {
			if (rows.length > 0) {
				let dbPassword = rows[0].password;

				bcrypt.compare(password, dbPassword, function(err, ress) {
					if (ress){
						let time = new Date().getTime();
						res.cookie('uuid', rows[0].uuid, {maxAge: time + (10 * 365 * 24 * 60 * 60), httpOnly: true});
						res.json({
							error: null
						});
					}else{
						res.json({
							error: true
						})
					}
				});
			} else {
				res.json({
					error: true
				});
			}
		});
	});
}

module.exports = {
	userJoinRequest: userJoinRequest(),
	userLoginRequest: userLoginRequest(),
};