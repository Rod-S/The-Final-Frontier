//import modules
const express = require('express');
const router = express.Router();

const User = require('../models/models').User;

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

//route to about page, rendering about.pug
router.get('/about', (req, res, next) => {
  res.render('about');
});

router.post('/', (req, res, next) => {
  User.create(req.body);
  res.redirect('/');
});

module.exports = router;
