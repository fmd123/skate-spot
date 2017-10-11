var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/map', function(req, res, next) {
  res.render('map', { title: 'Skate-Spotter' });
});



// router.get('/map', function(req, res, next) {
//   res.json(lat, lng)
// })

module.exports = router;
