//signing up for the site
//requests:
//email
//password
//Logic for comparing password
//hashing password

let passwordHash = require('password-hash');
let mysql = require('mysql');

let userJoinRequest = function() {
    app.post('/userJoinRequest', function(req, res){
        //variables
        let sql = `SELECT email FROM users WHERE username = ?`;
        connection.query(sql, [username], function (err, rows, fields){
            if (rows[0].email == null){
                let sql = `SELECT username FROM users WHERE email = ?`;
                connection.query(sql, [username], function(err, rows, fields){
                    if (rows[0].username == null){
                        let sql = `INSERT INTO users SET email = ?, username = ?, password = ?`
                        let email = req.body.email
                        let password = req.body.password
                        let username = req.body.username
                        //Hash passwords
                        let hashedPassword = passwordHash.generate(password);
                        connection.query(sql, [email, username, hashedPassword], function (err){
                            if (err) throw err;
                            console.log("Unable to write to DB email, user, or password")
                        });
                    }else{
                        res.json{
                            error: "email"
                        }
                    }
                })
            }else{
                res.json{
                    error: "username"
                }
            }
        })
    });
}

//login
//logic to see if password is the same
let userLoginRequest = function(){
    app.post('/userLoginRequest', function (req, res){
        let email = req.body.email
        let sql = `SELECT password FROM users WHERE email = ?`

        let hashedPassword = passwordHash.generate(req.body.password)
        connection.query(sql, [email], function(err, rows, fields){
            let dbPassword = rows[0].password
            if (hashedPassword === dbPassword)
                res.json{
                error: null
            }else{
                res.json{
                    error: "password"
                }
            }
        })

    });
};

module.exports = {
    userJoinrequest: userJoinRequest(),
    userLoginRequest: userLoginRequest(),
};