var express = require('express');
var router = express.Router();
//mongo_db
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL -> cluster -> config file
var uri = "mongodb://TheMole:TheMole@clustercourse-shard-00-00-kultg.mongodb.net:27017,clustercourse-shard-00-01-kultg.mongodb.net:27017,clustercourse-shard-00-02-kultg.mongodb.net:27017/test?ssl=true&replicaSet=ClusterCourse-shard-0&authSource=admin";
// Database config
const dbName = 'test';
const collectName = 'users';
var my_data = false;//'DB connection failed ! Please, reload page.'
//Finder
const findDocuments = function (db, callback) {
  // Get the documents collection
  const collection = db.collection(collectName);
  // Find some documents
  collection.find({}).toArray(function (err, docs) {
    assert.equal(err, null);
    my_data = docs;
    //console.log("Found the following records users.js");
    //console.log(docs);
    callback(docs);
  });
}


/* GET users listing. */
router.get('/', function (req, res) {
  // Use connect method to connect to the server
  MongoClient.connect(uri, function (err, client) {
    assert.equal(null, err);
    //console.log("Connected successfully to server users.js");
    const db = client.db(dbName);
  
    findDocuments(db, function () {
      client.close();
      /* here !!! */
      res.render('users', {
        title: 'Express - Users',
        appName: 'BrainBasket JS',
        mongo_result: my_data
      });
    });
  });
});

module.exports = router;