import { check } from 'express-validator'

const units = ['g', 'kg', 'l', 'ml', 'item']

export default class GroceryItemValidation {
	static addGroceryItemValidation = [
		check('name').trim().notEmpty().withMessage('Name is required'),
		check('price')
			.trim()
			.notEmpty()
			.withMessage('Price is required')
			.toFloat()
			.isFloat({ min: 1 }),
		check('quantity')
			.trim()
			.notEmpty()
			.withMessage('Quantity is required')
			.toInt()
			.isInt({ min: 1 }),
		check('unit')
			.trim()
			.optional()
			.isIn(units)
			.withMessage('Unit must be one of ' + units),
	]

	static getAllGroceryItemsValidation = [
		check('page').optional().toInt().isInt({ min: 1 }),
		check('limit').optional().toInt().isInt({ min: 0 }),
	]

	static updateGroceryItemValidation = [
		check('groceryItemId').trim().isInt({ min: 1 }),
		check('name').trim().notEmpty().withMessage('Name is required'),
		check('price')
			.trim()
			.notEmpty()
			.withMessage('Price is required')
			.toFloat()
			.isFloat({ min: 1 }),
	]

	static updateGroceryItemQuantityValidation = [
		check('groceryItemId').trim().isInt({ min: 1 }),
		check('type')
			.trim()
			.notEmpty()
			.withMessage('Type is required')
			.isIn(['inc', 'dec']),
		check('quantity')
			.trim()
			.notEmpty()
			.withMessage('Quantity is required')
			.toInt()
			.isInt({ min: 1 }),
	]

	static groceryItemIdValidation = [
		check('groceryItemId').trim().isInt({ min: 1 }),
	]
}
