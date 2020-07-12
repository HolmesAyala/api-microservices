let _ = require("lodash")
let Joi = require("joi")
let Util = require("util")
let Config = require("config")
let getParameters = require("get-parameter-names")
let { createLogger, format, transports } = require("winston")

let logger = createLogger({
	level: Config.LOG_LEVEL,
	transports: [
		new transports.Console({
			format: format.combine(
				format.colorize(),
				format.simple()
			)
		})
	]
})

/**
 * Log error detail with signature
 * @param {Error} err The error
 * @param {signature} signature The signature
 */
logger.logFullError = (err, signature) => {
	if(!err) return;

	if(signature) logger.error(`Error happened in: ${signature}`);

	logger.error(util.inspect(err))

	if(!err.logged) {
		logger.error(err.stack)
		err.logged = true
	}
}

/**
 * Convert array with arguments to object
 * @param {Array} params Parameters names
 * @param {Array} array Parameter values
 */
let _combineObject = (params, array) => {
	let obj = {}

	_.each(array, (value, idx) => {
		obj[params[idx]] = value
	})

	return obj
}

/**
 * Decorate all service functions, validate input values and
 * replace input arguments with normalized Joi. 
 * Service must have a schema property with Joi schema
 * @param {Object} service 
 */
logger.autoValidate = (service) => {
	_.each(service, (method, name) => {
		if(!method.schema) return;

		let params = getParameters(method)

		service[name] = async function () {
			let args = Array.prototype.slice.call(arguments)
			let value = _combineObject(params, args)
			let normalized = Joi.attempt(value, method.schema)

			let newArgs = []

			/**
			 * Normalize values according to schema
			 */
			_.each(params, param => {
				newArgs.push(normalized[param])
			})

			return method.apply(this, newArgs)
		}

		service[name].params = params
	})
}

module.exports = logger