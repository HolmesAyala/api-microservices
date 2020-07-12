let _ = require("lodash")
let AchievementDB = require("../models/AchievementDB")
let AchievementTypeService = require("./AchievementTypeService")

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

module.exports = {
	getAll,
	getByMember,
	assignAchievementToMember
}