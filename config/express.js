const express = require('express');
var createError = require('http-errors');
var logger = require('morgan');
var cors = require('cors');

// Import the routers
var indexRouter = require('../app/routers/index');
var projectsRouter = require('../app/routers/projects');

// Config Express
const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routers
app.use('/', indexRouter);
app.use('/api/projects', projectsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // render the error json
  res.status(err.status || 500);
  res.json(
    {
      success: false,
      message: err.message
    }
  );
});

module.exports = app;