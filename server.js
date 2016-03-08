var express = require('express'),
    app = express();


var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://admin:admin@ds062178.mlab.com:62178/db_projeckt';
var collection;
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err)
  {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  }
  else
  {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // do some work here with the database.
    collection = db.collection('mynewcollection');
    // collection.find().toArray(function(err,data){
    //   console.log(data);
    //
    // });
   }
});

app.use(express.static(__dirname + '/app'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.listen(8080);



console.log('Server running on port 8080.');
