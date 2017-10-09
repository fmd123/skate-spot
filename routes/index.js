var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {

  res.render('index', { title: 'SKATE SPOT', _layoutFile: 'layoutA.ejs'  });
});

router.get('/map', function(req, res, next) {

  res.render('map', { title: 'SKATE SPOT', _layoutFile: 'layoutA.ejs'  });
});



module.exports = router;
