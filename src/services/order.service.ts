import db from '../config/database'

export default class OrderService {
	static async addOrder(userId, name, data) {
		const order = await db.Order.create({ name, user_id: userId })

		const items = data.map((d) => ({ ...d, order_id: order.id }))

		await db.OrderItem.bulkCreate(items)

		const result = await db.Order.findOne({
			where: { id: order.id },
			include: [
				{
					model: db.OrderItem,
					as: 'items',
					include: [{ model: db.GroceryItem, as: 'grocery_item' }],
				},
			],
		})

		return result
	}
}
