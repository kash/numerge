let requestSearch = function () {
    app.post('/requestSearch', function(req, res){
        let searchPre = req.body.search
        console.log("Search:", search)
        let searchPost = searchPre.split(" ")
        for (let searching in searchPost){
            let searchString = searchpost[searching]
            let sql = `SELECT * FROM notes WHERE tags LIKE %?% OR title LIKE %?% AND public = 1`
            connection.query(sql, [searchString, searchString], function(err, rows, fields){
                if (rows.length > 0){
                    let output = [];
                    for (let k in rows){
                        let temp = {...rows[k]}
                        output.push(temp);
                    }
                    res.json(output);
                }else{
                    res.json{
                        empty: true
                    }
                }
            })
        }
    })
}