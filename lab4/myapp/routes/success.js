var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/success', function(req, res) {
  res.render('success');
});

module.exports = router;
