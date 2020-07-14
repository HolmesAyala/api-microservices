// Imports
let Express = require("express")
let Config = require("config")
let Mongoose = require("mongoose")
let Cors = require("cors")
let { errorHandler } = require("./helpers/middlewares")
let _ = require("lodash")
let routes = require("./routes")
let { validateToken } = require("./helpers")
let errors = require("./helpers/errors")

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

_.each(routes, (route, routeName) => {
	_.each(route, (def, verb) => {
		let actions = []
		
		if(def.requireAuth) {
			actions.push(async (req, res, next) => {
				try {
					let header = _.get(req.headers, "authorization", "")
					let token = _.get(header.split(" "), "[1]", "")
					console.log(token);
					let authUser = await validateToken(token, def.allowedRoles)
					req.authUser = authUser

					next()
				} catch (error) {
					next(error)
				}
			})
		}

		actions.push(def.method)

		expressServer[verb](routeName, actions)
	})
})

expressServer.use(errorHandler)

expressServer.listen(Config.PORT, () => {
	console.log("server in port: ", Config.PORT);
})
