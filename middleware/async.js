module.exports = function asyncMiddleware(handler) {
	return async (req, res, next) => {
		try {
			await handler(res, res);
		}
		catch (ex) {
			next(ex);
		}
	}
};