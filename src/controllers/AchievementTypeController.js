let AchievementTypeService = require("../services/AchievementTypeService")
let { wrapRoute } = require("../helpers")

/**
 * Get all achievement types
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
async function getAll(req, res) {
	res.json(await AchievementTypeService.getAll())
}

/**
 * Get one achievement type
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
async function getById(req, res) {
	let achievementType = await AchievementTypeService.getById(req.params.id)

	if(!achievementType)
		return res.sendStatus(404)

	res.json(achievementType)
}

/**
 * Create an achievement type
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
async function create(req, res) {
	res.json(await AchievementTypeService.create(req.body))
}

/**
 * Update an achievement type
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
async function update(req, res) {
	try {
		res.json(await AchievementTypeService.update(req.params.id, req.body))
	} catch (error) {
		res.sendStatus(404)
	}
}

/**
 * Remove an achievement type
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
async function remove(req, res) {
	try {
		await AchievementTypeService.remove(req.params.id)
		res.sendStatus(204)
	} catch (error) {
		res.sendStatus(404)
	}
}

module.exports = {
	getAll: wrapRoute(getAll),
	getById: wrapRoute(getById),
	create: wrapRoute(create),
	update: wrapRoute(update),
	remove: wrapRoute(remove)
}