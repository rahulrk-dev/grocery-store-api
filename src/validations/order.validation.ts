import { check } from 'express-validator'

export default class OrderValidation {
	static addOrderValidation = [
		check('name').trim().notEmpty().withMessage('Name is required'),
		check('items')
			.toArray()
			.isArray({ min: 1 })
			.withMessage('At least 1 item is required'),
		check('items.*.grocery_item_id').toInt().isInt({ min: 1 }),
		check('items.*.price').toFloat().isFloat({ min: 1 }),
		check('items.*.quantity').toInt().isInt({ min: 1 }),
	]
}
