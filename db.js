const winston = require('winston');
require('winston-mongodb');
const mongoose = require('mongoose');

module.exports = function() {
	mongoose.connect('mongodb://localhost/pingping')
		.then(() => winston.info('Connected to MongoDB'));
};