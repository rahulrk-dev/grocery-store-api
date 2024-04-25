import { Request, Response } from 'express'
import ApiError from '../utils/ApiError'
import GroceryItemService from '../services/groceryItem.service'

export default class GroceryItemController {
	static async addGroceryItemHandler(req: Request, res: Response) {
		const { name, price, quantity, unit } = req.body

		const groceryItem = await GroceryItemService.addGroceryItem({
			name,
			price,
			quantity,
			unit,
		})

		res.status(201).json({
			status: true,
			message: 'Grocery Item created successfully',
			data: groceryItem,
		})
	}

	static async getAllGroceryItemsHandler(req: Request, res: Response) {
		const { page, limit }: { page?: number; limit?: number } = req.query

		const groceryItems = await GroceryItemService.getAllGroceryItems(
			page,
			limit
		)

		if (!groceryItems.length) throw new ApiError(404, 'No grocery items found')

		res.status(200).json({
			status: true,
			message: 'Grocery Items list',
			data: groceryItems,
		})
	}

	static async getGroceryItemHandler(
		req: Request<{ groceryItemId: number }>,
		res: Response
	) {
		const { groceryItemId } = req.params

		const groceryItem = await GroceryItemService.getGroceryItem(groceryItemId)

		if (!groceryItem)
			throw new ApiError(404, 'No grocery items found with this id')

		res.status(200).json({
			status: true,
			message: 'Grocery item details',
			data: groceryItem,
		})
	}

	static async updateGroceryItemHandler(
		req: Request<{ groceryItemId: number }>,
		res: Response
	) {
		const { groceryItemId } = req.params
		const { name, price } = req.body

		const groceryItem = await GroceryItemService.updateGroceryItem(
			groceryItemId,
			{ name, price }
		)

		if (!groceryItem)
			throw new ApiError(404, 'No grocery items found with this id')

		res.status(200).json({
			status: true,
			message: 'Grocery item updated successfully',
			data: groceryItem,
		})
	}

	static async updateGroceryItemQuantityHandler(
		req: Request<{ groceryItemId: number }>,
		res: Response
	) {
		const { groceryItemId } = req.params
		const { type, quantity } = req.body

		const groceryItem = await GroceryItemService.updateGroceryItemQuantity(
			groceryItemId,
			quantity,
			type
		)

		if (!groceryItem)
			throw new ApiError(404, 'No grocery items found with this id')

		res.status(200).json({
			status: true,
			message: 'Grocery item updated successfully',
			data: groceryItem,
		})
	}

	static async removeGroceryItemHandler(
		req: Request<{ groceryItemId: number }>,
		res: Response
	) {
		const { groceryItemId } = req.params

		const groceryItem = await GroceryItemService.removeGroceryItem(
			groceryItemId
		)

		if (!groceryItem)
			throw new ApiError(404, 'No grocery items found with this id')

		res.status(200).json({
			status: true,
			message: 'Grocery item removed successfully',
			data: groceryItem,
		})
	}
}
