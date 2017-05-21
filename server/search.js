let requestSearch = function () {
    app.post('/requestSearch', function(req, res){
        search = req.body.search;
        console.log("Search:", search)

    })
}