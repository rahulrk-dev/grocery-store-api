import { DataTypes } from 'sequelize'

function GroceryItemModel(sequelize) {
	const attributes = {
		name: { type: DataTypes.STRING, allowNull: false },
		price: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		unit: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'g',
		},
	}

	return sequelize.define('GroceryItem', attributes)
}

export default GroceryItemModel
