
//==================> MODULES IMPORTS <==================
var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

//==================> DATABASE URI <==================
var remoteDBUrl = 'mongodb://admin:admin@ds062178.mlab.com:62178/db_projeckt';
var localDBUrl = 'mongodb://localhost/db_projeckt';

//==================> ARGUMENTS CONFIG <==================
var argv = require('optimist').default({
  db: "local",
  port: "8080"
}).argv;

var tokens = {
  dbUrl: (argv.db == "remote") ? remoteDBUrl : localDBUrl,
  port: (argv.port instanceof Number || typeof argv.port == 'number') ? argv.port : 8080
}

//==================> DATABASE CONFIG <==================
mongoose.connect(tokens.dbUrl);
var db = mongoose.connection;
db.on('error', function(err){
  console.error('Unable to connect to database. Error: ' + err);
});
db.once('open', function() {
  console.log("Successfully connected to database: " + tokens.dbUrl);
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('\nDatabase default connection disconnected through app termination.');
    process.exit(0);
  });
});

//==================> SERVER CONFIG <==================
app.use(express.static(__dirname + '/app'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());
app.listen(argv.port);
console.log('Server running on port ' + argv.port);

//==================> CRUD CONFIG <==================
var PublicAPI = require('./publicAPI');
var publicAPI = new PublicAPI(app);
publicAPI.create();
