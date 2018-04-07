var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('add', {
    title: 'Express - Add User',
    appName: 'BrainBasket JS',
    //users_list: bmr(page)
  });
  //res.send('Respond with a resource - Add user');
});

module.exports = router;