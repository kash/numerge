//Collect user info
//id
//email
//joined
//uuid

var cookieParser = require('cookie-parser')
http = require('http');
let passwordHash = require('password-hash');
let mysql = require('mysql');

let fetchUserInformation = function () {
    app.post('/fetchUserInformation', function (req, res) {

        let userID = req.body.userID
        if (userID == null) {
            let cookie = req.cookies("uuid")
            if (cookie == null) {
                res.json({
                    error: true
                })
            } else {
                let sql = `SELECT username, joined, uuid, location, bio, 
                firstname, lastname FROM users WHERE uuid = ?`

                connection.query(sql, cookie, function (err, rows, field) {
                    let dbcookie = rows[0].uuid
                    if (dbcookie === cookie) {
                        username = rows[0].username
                        email = rows[0].email
                        joined = rows[0].joined
                        firstname = rows[0].firstname
                        lastname = rows[0].lastname
                        uuid = rows[0].uuid
                        bio = rows[0].bio
                        location = rows[0].location

                        res.json({
                            username: username,
                            email: email,
                            fistname: firstname,
                            lastname: lastname,
                            joined: joined,
                            uuid: uuid,
                            location: location,
                            bio: bio,
                        })
                    } else {
                        res.json({
                            error: true
                        })
                    }
                })
            }
        } else {
            let sql = `SELECT email, username, joined, uuid, location, bio, 
                firstname, lastname FROM users WHERE userid = ?`
            connection.query(sql, [userID], function (err, rows, field) {
                username = rows[0].username
                email = rows[0].email
                joined = rows[0].joined
                firstname = rows[0].firstname
                lastname = rows[0].lastname
                uuid = rows[0].uuid
                bio = rows[0].bio
                location = rows[0].location

                res.json({
                    username: username,
                    email: email,
                    fistname: firstname,
                    lastname: lastname,
                    joined: joined,
                    uuid: uuid,
                    location: location,
                    bio: bio,
                })
            })
        }
    });
}

module.exports = {
    fetchUserInformation: fetchUserInformation()
}