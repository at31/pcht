var fs = require('fs'); 
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

  // Connection URL
var url = 'mongodb://localhost:27017/pcht';
// Use connect method to connect to the server

fs.readFile('./public/postals.json', 'utf8', function(err, contents) {
  var arr=JSON.parse(contents);
  //console.log(arr);
  MongoClient.connect(url,function(err,db){
    var collection=db.collection('postoffices');
    collection.insertMany(arr,function(err, r){
      console.log(r.insertedCount);
      db.close();
    });
  });   
});
