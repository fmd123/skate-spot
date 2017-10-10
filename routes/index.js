var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Skate-Spotter' });
});

router.get('/', function(req, res, next) {
  res.render('map', { title: 'Skate-Spotter' });
});



module.exports = router;
