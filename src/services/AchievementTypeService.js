let _ = require("lodash")
let AchievementTypeDB = require("../models/AchievementTypeDB")
const logger = require("../helpers/logger")
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

/**
 * Get all achievement types
 */
async function getAll() {
	return await AchievementTypeDB.find({})
}

/**
 * Get achievement type by its id
 * @param {String} id Id of achievement type
 */
async function getById(id) {
	try {
		let achievementType = await AchievementTypeDB.findById(id)

		if(!achievementType)
			throw new Error("Achievement type not found")

		return achievementType
	} catch (error) {
		throw error
	}
}

getById.schema = {
	id: Joi.objectId().required()
}

/**
 * Create an achievement type
 * @param {Object} data Achievement type
 */
async function create(data) {
	return await AchievementTypeDB.create(data)
}

create.schema = {
	data: Joi.object().keys({
		name: Joi.string().required()
	}).required()
}

/**
 * Update achievement type
 * @param {String} id Achievement type id
 * @param {Object} dataUpdated Fields to update of achievement type
 */
async function update(id, dataUpdated) {
	let achievementType = await getById(id)

	if(!achievementType) {
		throw new Error()
	}

	_.extend(achievementType, _.omit(dataUpdated, ["_id"]))

	return await achievementType.save()
}

update.schema = {
	id: Joi.objectId().required(),
	dataUpdated: Joi.object().keys({
		name: Joi.string().required()
	}).required()
}

/**
 * Remove an achievement type
 * @param {String} id Achievement type id
 */
async function remove(id) {
	let achievementType = await getById(id)
	return await achievementType.remove()
}

remove.schema = {
	id: Joi.objectId().required()
}

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove
}

logger.autoValidate(module.exports)