//require necessary dependencies
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = require('body-parser').json;
const createError = require('http-errors');
const mongoose = require('mongoose');
const routes = require('./routes/index.js');

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

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404);
	res.render('error');

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

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//start server on localhost port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

module.exports = app;
