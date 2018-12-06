const winston = require('winston');
const createError = require('http-errors');
const express = require('express');

const status = require('./routes/status');

const app = express();

require('./logging')();
require('./db')();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/status', status);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	winston.error(err.message, err);
	res.status(500).send('Internal error');
});

module.exports = app;
