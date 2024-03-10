import { DataTypes } from 'sequelize'
import db from '../config/database'

function OrderModel(sequelize) {
	const attributes = {
		name: { type: DataTypes.STRING, allowNull: false },
		user_id: { type: DataTypes.INTEGER, allowNull: false },
	}

	const Order = sequelize.define('Order', attributes)

	Order.belongsTo(db.User, { as: 'user', foreignKey: 'user_id' })
	Order.hasMany(db.OrderItem, { as: 'items', foreignKey: 'order_id' })

	return Order
}

export default OrderModel
