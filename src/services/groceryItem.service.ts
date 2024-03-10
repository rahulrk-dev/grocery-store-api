import db from '../config/database'

export default class GroceryItemService {
	static async addGroceryItem({
		name,
		price,
		quantity,
		unit,
	}: {
		name: string
		price: number
		quantity: number
		unit?: string
	}) {
		const groceryItem = new db.GroceryItem({ name, price, quantity, unit })

		await groceryItem.save()

		return groceryItem
	}

	static async getAllGroceryItems() {
		const groceryItems = await db.GroceryItem.findAll()

		return groceryItems
	}

	static async getGroceryItem(id: number) {
		const groceryItem = await db.GroceryItem.findOne({ where: { id } })

		return groceryItem
	}

	static async updateGroceryItem(id: number, data: any) {
		const groceryItem = await db.GroceryItem.findOne({ where: { id } })

		if (!groceryItem) return 0

		await groceryItem.update(data)

		return groceryItem
	}

	static async updateGroceryItemQuantity(
		id: number,
		quantity: string,
		type: 'inc' | 'dec' = 'inc'
	) {
		let groceryItem = await db.GroceryItem.findOne({ where: { id } })

		if (!groceryItem) return 0

		if (type === 'inc') {
			await groceryItem.increment('quantity', { by: quantity })
		} else await groceryItem.decrement('quantity', { by: quantity })

		return groceryItem.reload()
	}

	static async removeGroceryItem(id: number) {
		const groceryItem = await db.GroceryItem.findOne({ where: { id } })

		if (!groceryItem) return 0

		await groceryItem.destroy()

		return groceryItem
	}
}
