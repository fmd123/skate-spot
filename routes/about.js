var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/about', function(req, res, next) {

  res.render('about', { title: 'ABOUT', _layoutFile: 'layoutA.ejs'  });
});





module.exports = router;
