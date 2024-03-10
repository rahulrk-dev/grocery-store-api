import { Router } from 'express'
import catchAsync from '../../utils/catchAsync'
import GroceryItemController from '../../controllers/groceryItem.controller'
import authenticate from '../../middlewares/auth.middleware'
import permission from '../../middlewares/permission.middleware'
import Roles from '../../config/roles'
import GroceryItemValidation from '../../validations/groceryItem.validation'
import validate from '../../middlewares/validate.middleware'

const groceryItemRouter = Router()

groceryItemRouter.use(authenticate)

groceryItemRouter
	.route('/')
	.post(
		permission(Roles.ADMIN),
		GroceryItemValidation.addGroceryItemValidation,
		validate,
		catchAsync(GroceryItemController.addGroceryItemHandler)
	)
	.get(catchAsync(GroceryItemController.getAllGroceryItemsHandler))

groceryItemRouter
	.route('/:groceryItemId')
	.get(
		GroceryItemValidation.groceryItemIdValidation,
		validate,
		catchAsync(GroceryItemController.getGroceryItemHandler)
	)
	.patch(
		permission(Roles.ADMIN),
		GroceryItemValidation.updateGroceryItemValidation,
		validate,
		catchAsync(GroceryItemController.updateGroceryItemHandler)
	)
	.delete(
		permission(Roles.ADMIN),
		GroceryItemValidation.groceryItemIdValidation,
		validate,
		catchAsync(GroceryItemController.removeGroceryItemHandler)
	)

groceryItemRouter
	.route('/:groceryItemId/levels')
	.patch(
		permission(Roles.ADMIN),
		GroceryItemValidation.updateGroceryItemQuantityValidation,
		validate,
		catchAsync(GroceryItemController.updateGroceryItemQuantityHandler)
	)

export default groceryItemRouter
