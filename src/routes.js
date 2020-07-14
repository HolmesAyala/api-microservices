let AchievementTypeController = require("./controllers/AchievementTypeController")
let AchievementController = require("./controllers/AchievementController")
let AuthController = require("./controllers/AuthController")

module.exports = {
	"/auth/:role": {
		post: {
			method: AuthController.auth
		}
	},
	"/achievement-types": {
		get: {
			method: AchievementTypeController.getAll,
			requireAuth: true,
			allowedRoles: ["admin"]
		},
		post: {
			method: AchievementTypeController.create
		}
	},
	"/achievement-types/:id": {
		get: {
			method: AchievementTypeController.getById
		},
		put: {
			method: AchievementTypeController.update
		},
		delete: {
			method: AchievementTypeController.remove
		}
	},
	"/members/:memberId/achievements": {
		get: {
			method: AchievementController.getByMember
		},
		post: {
			method: AchievementController.assignAchievementToMember
		}
	},
	"/members/:memberId/achievements/:achievementId": {
		delete: {
			method: AchievementController.removeAchievementToMember
		}
	}
}
