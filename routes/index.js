var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Skate-Spotter' });
});

router.get('/map', function(req, res, next) {
  res.render('map', { title: 'Dont blow em out' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Sup Newbie' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: '... But this guy, luvs the spots' });
});

router.get('/spotform', function(req, res, next) {
  res.render('spotform', { title: 'You got spots bro?' });
});




module.exports = router;
