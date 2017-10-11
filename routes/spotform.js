'use strict';

const bcrypt = require('bcrypt');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

router.get('/spotform', function(req, res, next) {
  res.render('spotform', { title: 'CREATE NEW SPOT', _layoutFile: 'layoutA.ejs'  });
});


module.exports = router;

// :::::::::::::::::::::::::::::::::::
