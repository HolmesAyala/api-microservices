module.exports = {
	PORT: process.env.PORT || 3000,
	MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost/api-microservices-db",
	LOG_LEVEL: process.env.LOG_LEVEL || "debug",
	JWT_SECRET: process.env.JWT_SECRET || "secret"
}