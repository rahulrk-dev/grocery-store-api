import { NextFunction, Request, Response } from 'express'

import { FieldValidationError, validationResult } from 'express-validator'

const validate = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		return next()
	}
	const extractedErrors = []
	errors
		.array({ onlyFirstError: true })
		.map((err: FieldValidationError) =>
			extractedErrors.push({ [err.path]: err.msg })
		)

	return res.status(422).json({
		status: false,
		code: 422,
		message: 'Request validation failed!',
		errors: extractedErrors,
	})
}

export default validate
