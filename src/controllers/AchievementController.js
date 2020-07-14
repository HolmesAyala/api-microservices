let AchievementService = require("../services/AchievementService")
let { wrapRoute } = require("../helpers")

/**
 * Get all achievements
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
async function getAll(req, res) {
	res.json(await AchievementService.getAll())
}

/**
 * Get member achievements
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
async function getByMember(req, res) {
	res.json(await AchievementService.getByMember(req.params.memberId))
}

/**
 * 
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
async function assignAchievementToMember(req, res) {
	res.json(await AchievementService.assignAchievementToMember(
		req.params.memberId,
		req.body.achievementId
	))
}

/**
 * 
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
async function removeAchievementToMember(req, res) {
	await AchievementService.removeAchievementToMember(
		req.params.memberId,
		req.params.achievementId
	)

	res.sendStatus(204)
}

module.exports = {
	getAll: wrapRoute(getAll),
	getByMember: wrapRoute(getByMember),
	assignAchievementToMember: wrapRoute(assignAchievementToMember),
	removeAchievementToMember: wrapRoute(removeAchievementToMember)
}