import { check } from 'express-validator'

export default class UserValidation {
	static registerValidation = [
		check('name').trim().notEmpty().withMessage('Name is required'),
		check('email')
			.trim()
			.notEmpty()
			.withMessage('Email is required')
			.isEmail()
			.withMessage('Invalid email'),
		check('password')
			.trim()
			.notEmpty()
			.withMessage('Password is required')
			.isLength({ min: 6 })
			.withMessage('Password must be 6 or more characters long'),
	]

	static loginValidation = [
		check('email')
			.trim()
			.notEmpty()
			.withMessage('Email is required')
			.isEmail()
			.withMessage('Invalid email'),
		check('password')
			.trim()
			.notEmpty()
			.withMessage('Password is required')
			.isLength({ min: 6 })
			.withMessage('Password must be 6 or more characters long'),
	]
}
