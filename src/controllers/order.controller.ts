import { Response } from 'express'
import { IGetUserAuthInfoRequest } from '../middlewares/auth.middleware'
import OrderService from '../services/order.service'

export default class OrderController {
	static async addOrderHandler(req: IGetUserAuthInfoRequest, res: Response) {
		const { id: userId } = req.user
		const { name, items } = req.body

		const order = await OrderService.addOrder(userId, name, items)

		res.status(201).json({
			status: true,
			message: 'Order created successfully',
			data: order,
		})
	}
}
