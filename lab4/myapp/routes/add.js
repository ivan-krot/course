var express = require('express');
var router = express.Router();

var twitter = require('twitter');
var config = require('../config');
var client = new twitter(config.twitter);

/* GET users listing. */
router.get('/', function(req, res) {
  client.post('statuses/update', {status: 'We Love Twitter'},  function(error, tweet, response) {
    if(error) throw error;
    console.log(error);  // Error. 
    console.log(tweet);  // Tweet body. 
    console.log(response);  // Raw response object. 
  });
  res.render('add', {
    title: 'Express - Add User',
    appName: 'BrainBasket JS',
    //users_list: bmr(page)
  });
  //res.send('Respond with a resource - Add user');
});

module.exports = router;