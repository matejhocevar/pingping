const mongoose = require('mongoose');
const Joi = require('joi');

const locationSchema= new mongoose.Schema({
	ip: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 15,
		match: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
	},
	location: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 255
	}
});

const Location = mongoose.model('location', locationSchema);

function validateLocation(genre) {
	const schema = {
		ip: Joi.string().min(3).max(15).required(),
		location: Joi.string().min(1).max(255).required(),
	};

	return Joi.validate(genre, schema);
}

exports.Location = Location;
exports.validate = validateLocation;
exports.locationSchema = locationSchema;