let util = require("util")

/**
 * Helper to create a http error
 * @param {String} name Error name
 * @param {Number} statusCode http status of error
 * @returns {Function} error constructor
 */
function createError(name, statusCode) {
	/**
	 * Error constructor
	 * @param {String} message Error message
	 * @param {String} cause Error cause
	 * @constructor
	 */
	function ErrorConstructor(message, cause) {
		Error.call(this)
		Error.captureStackTrace(this)
		this.message = message || name
		this.cause = cause
		this.httpStatus = statusCode
	}

	util.inherits(ErrorConstructor, Error)
	ErrorConstructor.prototype.name = name

	return ErrorConstructor
}

module.exports = {
	BadRequestError: createError("BadRequestError", 400),
	UnauthorizedError: createError("UnauthorizedError", 401),
	ForbiddenError: createError("ForbiddenError", 403),
	NotFoundError: createError("NotFoundError", 404),
	ServiceUnavailableError: createError("ServiceUnavailableError", 503),
}
