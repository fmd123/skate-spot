var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SKATE SPOT', _layoutFile: 'layout.ejs'  });
});



module.exports = router;