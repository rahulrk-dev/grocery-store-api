import { Request, Response } from 'express'
import AuthService from '../services/auth.service'
import ApiError from '../utils/ApiError'

export default class AuthController {
	static async register(req: Request, res: Response) {
		const { name, email, password } = req.body

		const user = await AuthService.register({ name, email, password })

		if (!user) throw new ApiError(400, `Email "${email}" is already registered`)

		res
			.status(201)
			.json({ status: true, message: 'User registered', data: user })
	}
	static async login(req: Request, res: Response) {
		const { email, password } = req.body

		const user = await AuthService.login({ email, password })

		if (!user) throw new ApiError(403, 'Email or password is incorrect')

		res.status(200).json({
			status: true,
			message: 'User logged in successfully',
			data: user,
		})
	}
}
