var express = require('express');
var router = express.Router();
var twitter = require('twitter');
var config = require('../config');
var client = new twitter(config.twitter);
//mongo_db
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL -> cluster

var uri = "mongodb://TheMole:TheMole@clustercourse-shard-00-00-kultg.mongodb.net:27017,clustercourse-shard-00-01-kultg.mongodb.net:27017,clustercourse-shard-00-02-kultg.mongodb.net:27017/test?ssl=true&replicaSet=ClusterCourse-shard-0&authSource=admin";


// Database Name
const dbName = 'test';
const collectName = 'users';

const findDocuments = function (db, callback) {
  // Get the documents collection
  const collection = db.collection(collectName);
  // Find some documents
  collection.find({}).toArray(function (err, docs) {
    assert.equal(err, null);
    //console.log("Found the following records");
    //console.log(docs)
    callback(docs);
  });
}

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  })
}

// Use connect method to connect to the server
MongoClient.connect(uri, function (err, client) {
  assert.equal(null, err);
  //console.log("Connected successfully to server");
  const db = client.db(dbName);
  
  //db.collection('users').insert( { firstName: "Ivan", lastName: "Krot", twitter: "@i_m_krot" } );
  findDocuments(db, function () {
    client.close();
  });
});

/* GET home page. */
router.get('/', function (req, res) {
  var params = { screen_name: 'i_m_krot' };//user screen_name
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      var tw = (tweets.map((twit) => {
        return { text: twit.text, name: twit.user.name };
      }));
      res.render('index', {
        title: 'Express',
        //config: tw,
        appName: 'BrainBasket JS',
        text: tw,
        name: tw[0].name
      });
    }
  });
});

module.exports = router;
