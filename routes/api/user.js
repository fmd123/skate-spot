var express = require('express');
var router = express.Router();
const users = require('./users/knex');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('I have changed this');
});

module.exports = router;
