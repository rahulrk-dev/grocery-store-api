import { ConnectionOptions, createConnection } from 'mysql2'
import { Sequelize } from 'sequelize'
import { hash } from 'bcrypt'

import config from '.'
import UserModel from '../models/user.model'
import GroceryItemModel from '../models/groceryItem.model'
import OrderModel from '../models/order.model'
import OrderItemModel from '../models/orderItem.model'
import Roles from './roles'

const dbAccess: ConnectionOptions = config.db

const db: any = {}

async function initialize() {
	const { host, port, user, password, database } = dbAccess
	const connection = await createConnection({
		host,
		port,
		user,
		password,
	})
	// create db if it doesn't already exist
	connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`)

	// connect to db
	const sequelize = new Sequelize(database, user, password, {
		dialect: 'mysql',
	})

	db.User = UserModel(sequelize)
	db.GroceryItem = GroceryItemModel(sequelize)
	db.OrderItem = OrderItemModel(sequelize)
	db.Order = OrderModel(sequelize)

	// create admin user
	await db.User.findOrCreate({
		where: { email: process.env.ADMIN_USER },
		defaults: {
			name: 'Admin',
			hash: await hash(process.env.ADMIN_PASS, 10),
			role: Roles.ADMIN,
		},
	})

	await sequelize.sync({ alter: true })
}

initialize()

export default db
