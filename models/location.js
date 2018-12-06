const mongoose = require('mongoose');
const Joi = require('joi');

const locationSchema= new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	}
});

const Location = mongoose.model('location', locationSchema);

function validateLocation(genre) {
	const schema = {
		name: Joi.string().min(5).max(50).required()
	};

	return Joi.validate(genre, schema);
}

exports.Location = Location;
exports.validate = validateLocation;
exports.locationSchema = locationSchema;