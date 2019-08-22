//require necessary dependencies
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = require('body-parser').json;
const createError = require('http-errors');
const mongoose = require('mongoose');

const User = require('./models/models').User;

const app = express();

//setup static route to serve static files in public folder
app.use('/static', express.static('public'));

// view engine setup
app.set('view engine', 'pug');

// mongodb connection
mongoose.connect("mongodb://localhost:27017/tff");
var db = mongoose.connection;
// display message if mongodb connection error
db.on('error', console.error.bind(console, 'connection error'));
// open mongo connection, display message on mongodb success
db.once("open", function(){
	console.log("db connection successful");
});

// morgan gives us http request logging
app.use(morgan('dev'));

// parse incoming requests
app.use(jsonParser());
app.use(bodyParser.urlencoded({ extended: false }));

// GET home page.
app.get('/', (req, res, next) => {
  res.render('index');
});

//route to about page
app.get('/about', (req, res, next) => {
  res.render('about');
});

//post email list modal form from home page
app.post('/', (req, res, next) => {
	let promise = User.create(req.body);
  promise.then(() => {
    res.status(201);
    res.redirect('/');
  })
	.catch((err) => {
    if (err.name == 'ValidationError') {
			res.render('errormodal', {
					fullName: req.body.fullName,
					emailAddress: req.body.emailAddress,
					errors: err.errors
				})
			}
		});
});

//post email list modal form from about page
app.post('/about', (req, res, next) => {
  User.create(req.body);
  res.redirect('/about');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404);
	res.render('error');
});


// Mongoose ValidationError handler OR
// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
	if (err.name == 'ValidationError') {
		res.status(400).json({
			message: err.message,
			error: {},
			status: res.statusCode
		})
	} else {
  	res.status(err.status || 500).json({
    	message: err.message,
    	error: {}
  	});
	}
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//start server on localhost port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

module.exports = app;
