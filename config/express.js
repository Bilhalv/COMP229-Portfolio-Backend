const express = require('express');
var createError = require('http-errors');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config({ quiet: true });

// Import the routers
var indexRouter = require('../app/routers/index');
var projectsRouter = require('../app/routers/projects');
var referencesRouter = require('../app/routers/references')
var servicesRouter = require('../app/routers/services')

// Comma-separated allowlist; falls back to any origin when unset.
const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map(function (origin) {
    return origin.trim();
  })
  .filter(Boolean);

// Config Express
const app = express();
app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routers
app.use('/', indexRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/references', referencesRouter);
app.use('/api/services', servicesRouter);


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