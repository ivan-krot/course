var express = require('express');
var router = express.Router();
var twitter = require('twitter');
var config = require('../config');
var client = new twitter(config.twitter);
/* GET home page. */
router.get('/', function (req, res) {
  var params = { screen_name: 'Krot_John' };//user_id
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      var tw = (tweets.map((twit) => {
        return {text: twit.text, name: twit.user.name};
      }));
      res.render('index', {
        title: 'Express',
        //config: tw,
        appName: 'BrainBasket JS',
        text: tw
      });
    }
  });
});

module.exports = router;
