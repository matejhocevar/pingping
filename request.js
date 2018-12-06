const request = require('request');

module.exports = async (value) => {
	return new Promise((resolve, reject) => {
		request(value, (error, response, data) => {
			if(error) reject(error);
			else resolve(data);
		})
	});
};
