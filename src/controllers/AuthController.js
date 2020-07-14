let { wrapRoute, generateToken } = require("../helpers")

async function login(req, res) {
	let token = await generateToken(req.params.role || "")
	res.json({ token })
}

module.exports = {
	auth: wrapRoute(login)
}
