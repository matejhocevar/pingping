const express = require('express');
const router = express.Router();
const request = require('../request');
const _ = require('lodash');

const auth = require('../middleware/auth');
const { Location, validate } = require('../models/location');

router.get('/', auth, async function(req, res) {
	try {
		let ip = (req.headers != null ? req.headers['x-forwarded-for'] : null) ||
			req.connection.remoteAddress ||
			req.socket.remoteAddress ||
			(req.connection.socket ? req.connection.socket.remoteAddress : null);

		let readFromDB = true;

		ip = (ip === '::1') ? '89.142.124.173' : ip;

		let object = await Location.findOne({ ip: ip });

		if (!object) {
			let response = await request({
				uri: `https://get.geojs.io/v1/ip/geo.json?ip=${ip}`,
				json: true
			});

			const location = response[0]['country'];
			const { error } = validate({ ip: ip, location: location });
			if (error) return res.status(400).send(error.details[0].message);

			object = new Location({ ip: ip, location: location });
			object = await object.save();
			readFromDB = false;
		}

		res.send({
			object: _.pick(object, ['ip', 'location']),
			'read_from_db': readFromDB
		});
	}
	catch (ex) {
		return res.status(400);
	}
});

module.exports = router;
