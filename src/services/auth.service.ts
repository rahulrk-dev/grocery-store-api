import { compare, hash } from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import db from '../config/database'
import config from '../config'

export default class AuthService {
	static async register({ name, email, password }) {
		if (await db.User.findOne({ where: { email } })) {
			return 0
		}

		const user = new db.User({ name, email })

		user.hash = await hash(password, 10)

		await user.save()

		const payload = { sub: user.id, role: user.role }

		const token = jwt.sign(payload, config.jwt.secret, {
			expiresIn: config.jwt.expiresIn,
		})

		return { token }
	}

	static async login({ email, password }) {
		const user = await db.User.scope('withHash').findOne({ where: { email } })

		if (!user) return 0

		const checkPassword = await compare(password, user.hash)

		if (!checkPassword) return 0

		const payload = { sub: user.id, role: user.role }

		const token = jwt.sign(payload, config.jwt.secret, {
			expiresIn: config.jwt.expiresIn,
		})

		return { token }
	}
}
