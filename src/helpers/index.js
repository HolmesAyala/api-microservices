let Co = require("co")

/**
 * Runs a function using the 'co' model for
 * use async/await syntax
 * @param {Function} fn Controller function
 */
function wrapRoute(fn) {
	return (req, res, next) => {
		Co(fn(req, res, next)).catch(next)
	}
}

module.exports = {
	wrapRoute
}