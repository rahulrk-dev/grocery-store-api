import { Router } from 'express'
import catchAsync from '../../utils/catchAsync'
import authenticate from '../../middlewares/auth.middleware'
import permission from '../../middlewares/permission.middleware'
import Roles from '../../config/roles'
import OrderController from '../../controllers/order.controller'
import OrderValidation from '../../validations/order.validation'
import validate from '../../middlewares/validate.middleware'

const orderRouter = Router()

orderRouter.use(authenticate)

orderRouter
	.route('/')
	.post(
		permission(Roles.USER),
		OrderValidation.addOrderValidation,
		validate,
		catchAsync(OrderController.addOrderHandler)
	)

export default orderRouter
