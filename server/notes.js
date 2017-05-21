let passwordHash = require('password-hash');
let mysql = require('mysql');

let createNewNote = function (){
    app.post('/createNewNote', function (req, res){
        let sql = `INSERT INTO notes SET userid = ?, title = ?, tags = ?, text = ?
        timecreated = ? `
        //vars
        let userid = req.body.userid;
        let text = req.body.text;
        let title = req.body.title;
        let tags = req.body.tags;
        let timeCreated = Date(year, month, day, hours, minutes);
        connection.query(sql, [userid, title, tags, text, timeCreated], function(err){
            if (err) throw err;
            console.log('Unable to write to DB when creating new Note')
            let sql = 'SELECT id FROM notes WHERE userid = ?'
            connection.query(sql, [userid], function(err, rows, fields){
                let id = rows[0].id
                if (noteid == null)
                    res.json{
                        error: "error"
                }else{
                    res.json{
                        id: id
                    }
                }
            })
        })
    })
}
module.exports = {
    createNewNote: createNewNote()
}