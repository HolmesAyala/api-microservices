let Mongoose = require("mongoose")
let Schema = Mongoose.Schema

let AchievementTypeDBSchema = new Schema({
	name: {
		type: String,
		required: true
	}
})

module.exports = Mongoose.model("AchievementTypeDB", AchievementTypeDBSchema)
