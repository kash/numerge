/**
 * Setting up express server and requirements for server to run. Server can be started by
 * doing 'npm start node'
 */
const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const async = require('async');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 * Setting up connection to local database
 * TODO: Set up connection to production db if URL matches
 */
const connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: 'root',
	database: 'numerge'
});
connection.connect();

// Settings global variables
global.connection = connection;
global.app = app;
global.async = async;

/**
 * All server files end up in here, hence the require(...) Variables app and connection
 * are passed here. Usually, app is always passed.
 */
require('./login');
require('./notes');
require('./user.js');

/**
 * Serving client directory so that server has access to all JavaScript and CSS files.
 *
 * Directing all routes to index.html, hence the '*'
 */
app.use('/client', express.static(__dirname + '/../client'));
app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, '../', 'index.html'));
});

/**
 * Setting port to default port if one is set, if not (local), set port to 3000 and start
 * server.
 */
let port = process.env.port || 3000;
app.listen(port, function () {
	console.log("Listening on port " + port);
});