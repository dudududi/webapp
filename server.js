var express = require('express'),
    app = express();

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

// Connection string
var url = 'mongodb://admin:admin@ds062178.mlab.com:62178/db_projeckt';
var collection;

MongoClient.connect(url, function (err, db) {
  if (err)
  {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  }
  else
  {
    console.log('Connection established to', url);

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
