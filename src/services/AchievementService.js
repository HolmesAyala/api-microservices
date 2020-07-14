let _ = require("lodash")
let AchievementDB = require("../models/AchievementDB")
let AchievementTypeService = require("./AchievementTypeService")
const logger = require("../helpers/logger")
let Joi = require("joi")
Joi.objectId = require('joi-objectid')(Joi)

/**
 * Get all achievements
 */
async function getAll() {
	return await AchievementDB.find({})
}

/**
 * Get member achievements
 * @param {Number} memberId Id of member
 */
async function getByMember(memberId) {
	return await AchievementDB.find({ memberId: _.toInteger(memberId) })
}

getByMember.schema = {
	memberId: Joi.number().required()
}

/**
 * Assign achievement to member
 * @param {Number} memberId Id of member
 * @param {String} achievementId Id of achievement
 */
async function assignAchievementToMember(memberId, achievementId) {
	let achievementType = await AchievementTypeService.getById(achievementId)

	let alreadyAssigned = await AchievementDB.findOne({ memberId, achievementId })
	console.log(alreadyAssigned);
	if(alreadyAssigned)
		throw new Error("Achievement already assigned to member")

	return AchievementDB.create({
		memberId,
		achievementId
	})
}

assignAchievementToMember.schema = {
	memberId: Joi.number().required(),
	achievementId: Joi.objectId().required()
}

/**
 * Remove an achievement of a member
 * @param {String} memberId Member id
 * @param {String} achievementId Achievement id
 */
async function removeAchievementToMember(memberId, achievementId) {
	let achievement = await AchievementDB.findOne({
		memberId,
		achievementId
	})

	if(!achievement) throw new Error("Achievement not found");

	await achievement.remove()
}

removeAchievementToMember.schema = {
	memberId: Joi.number().required(),
	achievementId: Joi.objectId().required()
}

module.exports = {
	getAll,
	getByMember,
	assignAchievementToMember,
	removeAchievementToMember
}

logger.autoValidate(module.exports)