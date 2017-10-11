var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Skate-Spotter' });
});

router.get('/', function(req, res, next) {
  res.render('map', { title: 'Skate-Spotter' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

router.get('/map', function(req, res, next) {
  res.render('map', { title: 'SKATE SPOT', _layoutFile: 'layoutA.ejs'  });
});

router.get('/spotform', function(req, res, next) {
  res.render('spotform', { title: 'CREATE NEW SPOT', _layoutFile: 'layoutA.ejs'  });
});








module.exports = router;
