const express = require('express');
const router = express.Router();

const asyncMiddleware = require('../middleware/async');
const { Location, validate } = require('../models/location');

router.get('/', asyncMiddleware(async function(req, res, next) {
	let location = new Location({ name: 'My name' });

	location = await location.save();
	res.send(location);
  res.send('It works!');
}));

module.exports = router;
