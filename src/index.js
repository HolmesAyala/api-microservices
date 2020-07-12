// Imports
let Express = require("express")
let Config = require("config")
let Mongoose = require("mongoose")
let Cors = require("cors")
let AchievementTypeController = require("./controllers/AchievementTypeController")
let AchievementController = require("./controllers/AchievementController")
let { errorHandler } = require("./helpers/middlewares")

// Variables
let expressServer = Express()

Mongoose.connect(Config.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => {
	console.log("Connected to database");
})
.catch(error => {
	console.log("Faile connecting to database");
	console.log(error);
	process.exit(1)
})

expressServer.use(Express.json())
expressServer.use(Cors())

expressServer.get("", (req, res) => {
	res.send("Running")
})

expressServer.get("/achievement-type", AchievementTypeController.getAll)
expressServer.post("/achievement-type", AchievementTypeController.create)
expressServer.get("/achievement-type/:id", AchievementTypeController.getById)
expressServer.put("/achievement-type/:id", AchievementTypeController.update)
expressServer.delete("/achievement-type/:id", AchievementTypeController.remove)

expressServer.get("/members/:memberId/achievements", AchievementController.getByMember)
expressServer.post("/members/:memberId/achievements", AchievementController.assignAchievementToMember)

expressServer.use(errorHandler)

expressServer.listen(Config.PORT, () => {
	console.log("server in port: ", Config.PORT);
})
