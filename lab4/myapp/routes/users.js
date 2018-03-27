var express = require('express');
var router = express.Router();
//my module
var bmr = require('../my_modules/bymereader');

//read users data from file in 'page' variable
var page = 'users.txt';
var users = bmr(page);

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('users', {
    title: 'Express - Users',
    appName: 'BrainBasket JS',
    users_list: bmr(page)
  });
  //res.send('Respond with a resource');
});

module.exports = router;
