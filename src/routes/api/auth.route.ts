import { Router } from 'express'
import AuthController from '../../controllers/auth.controller'
import catchAsync from '../../utils/catchAsync'
import UserValidation from '../../validations/user.validation'
import validate from '../../middlewares/validate.middleware'

const authRouter = Router()

authRouter
	.route('/register')
	.post(
		UserValidation.registerValidation,
		validate,
		catchAsync(AuthController.register)
	)

authRouter
	.route('/login')
	.post(
		UserValidation.loginValidation,
		validate,
		catchAsync(AuthController.login)
	)

export default authRouter
