import { Router } from 'express'
import authRouter from './api/auth.route'
import groceryItemRouter from './api/groceryItem.route'
import orderRouter from './api/order.route'

const apiRouter = Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/grocery-items', groceryItemRouter)
apiRouter.use('/orders', orderRouter)

export default apiRouter
