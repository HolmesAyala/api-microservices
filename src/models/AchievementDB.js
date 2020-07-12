let Mongoose = require("mongoose")
let Schema = Mongoose.Schema

let AchievementDBSchema = new Schema({
	memberId: {
		type: Number,
		required: true
	},
	achievementId: {
		type: String,
		required: true
	}
})

module.exports = Mongoose.model("AchievementDB", AchievementDBSchema)