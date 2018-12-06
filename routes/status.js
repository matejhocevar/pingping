const express = require('express');
const router = express.Router();

const asyncMiddleware = require('../middleware/async');
const { Location, validate } = require('../models/location');

router.get('/', asyncMiddleware(async function(req, res, next) {
	let ip = (req.headers != null ? req.headers['x-forwarded-for'] : null) ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		(req.connection.socket ? req.connection.socket.remoteAddress : null);
	console.log(`Detected IP: ${ip}`);

	let readFromDB = true;

	ip = (ip === '::1') ? '127.0.0.1' : ip;

	let object = await Location.findOne({ ip: ip });

	if (!object) {
		const location = 'Ljubljana';   // Fetch location
		const { error } = validate({ ip: ip, location });
		if (error) return res.status(400).send(error.details[0].message);

		object = new Location({ ip: ip, location: location });
		object = await object.save();
		readFromDB = false;
	}
	// res.send(object);
	res.send({ object: object, 'read_from_db': readFromDB });
}));

module.exports = router;
