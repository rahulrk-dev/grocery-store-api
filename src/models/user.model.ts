import { DataTypes } from 'sequelize'
import Roles from '../config/roles'

function UserModel(sequelize) {
	const attributes = {
		name: { type: DataTypes.STRING, allowNull: false },
		email: { type: DataTypes.STRING, allowNull: false },
		hash: { type: DataTypes.STRING, allowNull: false },
		role: {
			type: DataTypes.INTEGER,
			allowNull: false,
			enum: Roles,
			defaultValue: Roles.USER,
		},
	}

	const options = {
		defaultScope: {
			attributes: { exclude: ['hash'] },
		},
		scopes: {
			withHash: { attributes: {} },
		},
	}

	const User = sequelize.define('User', attributes, options)

	User.prototype.toJSON = function () {
		var values = Object.assign({}, this.get())

		delete values.hash
		return values
	}

	return User
}

export default UserModel
