import { DataTypes } from 'sequelize'
import db from '../config/database'

function OrderItemModel(sequelize) {
	const attributes = {
		order_id: { type: DataTypes.INTEGER, allowNull: false },
		grocery_item_id: { type: DataTypes.INTEGER, allowNull: false },
		price: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	}

	const OrderItem = sequelize.define('OrderItem', attributes)

	OrderItem.belongsTo(db.GroceryItem, {
		as: 'grocery_item',
		foreignKey: 'grocery_item_id',
	})

	return OrderItem
}

export default OrderItemModel
