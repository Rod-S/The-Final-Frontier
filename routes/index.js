//import modules
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

//route to about page, rendering about.pug
router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
