let _ = require("lodash")
const logger = require("./logger")

/**
 * Handle errors in the app
 * @param {Object} err 
 * @param {Object} req Request object
 * @param {Object} res Response Object
 * @param {Function} next Next middleware
 */
function errorHandler(err, req, res, next) {
	logger.logFullError(err, req.signature || `${req.method} ${req.url}`)
	let responseError = {}
	let status = error.httpStatus || 503

	if(err.isJoi) {
		status = 400

		if(err.details) {
			_.map(err.details, (e) => {
				if(e.message) {
					if(_.isUndefined(responseError.message)) {
						responseError.message = e.message
					}
					else {
						responseError.message += `, ${e.message}`
					}
				}
			})
		}
	}

	if(_.isUndefined(responseError.message)) {
		responseError.message = err.message && status !== 503 ? err.message : "Internal server error"
	}

	res.status(status).json(responseError)
}

module.exports = {
	errorHandler
}