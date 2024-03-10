export default {
	server: {
		port: parseInt(process.env.SERVER_PORT, 10) || 3030,
	},
	db: {
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT, 10) || 3306,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		expiresIn: '1h',
	},
}
