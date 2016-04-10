var express = require('express')
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var db;

app.use(express.static('static'));

app.get('/api/bugs', function(req, res) {
	db.collection("bugs").find().toArray(function(err, docs) {
	  res.json(docs);
	});
});

app.use(bodyParser.json());
app.post('/api/bugs/', function(req, res) {
  console.log("Req body:", req.body);
  var newBug = req.body;
  newBug.id = bugData.length + 1;
  bugData.push(newBug);
  res.json(newBug);
});

MongoClient.connect('mongodb://localhost/bugsdb', function(err, dbConnection) {
  db = dbConnection;
  var server = app.listen(3000, function() {
	  var port = server.address().port;
	  console.log("Started server at port", port);
  });
});
