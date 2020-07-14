let Co = require("co")
let jwt = require("jsonwebtoken")
let Config = require("config")
let _ = require("lodash")
let errors = require("./errors")

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

/**
 * Generate JWT
 * @param {String} role The user rol
 */
async function generateToken(role) {
	return jwt.sign({ role }, Config.JWT_SECRET)
}

/**
 * Decode a JWT token
 * @param {String} token JWT token
 * @param {Array[String]} roles The array of allowed roles
 */
async function validateToken(token, roles) {
	let payload = null

	try {
		payload = await jwt.verify(token, Config.JWT_SECRET)
	} catch (error) {
		throw new errors.UnauthorizedError("Action not allowed for anonymous")
	}
	
	if(!_.isUndefined(roles)) {
		if(!roles.includes(payload.role)) {
			throw new errors.ForbiddenError("You aren't allowed to perform this operation")
		}
	}

	return payload
}

module.exports = {
	wrapRoute,
	generateToken,
	validateToken
}