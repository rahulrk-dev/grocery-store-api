require('dotenv').config()

import * as Express from 'express'
import * as cors from 'cors'
import apiRouter from './routes'
import config from './config'

const app = Express()
const port = config.server.port

app.use(cors())
app.use(Express.json())
app.use(Express.urlencoded({ extended: false }))

app.use('/api', apiRouter)

app.use(
	(
		err: any,
		_req: Express.Request,
		res: Express.Response,
		_next: Express.NextFunction
	) => {
		let { statusCode = 500, message } = err

		res.locals.errorMessage = err.message

		const response = {
			status: false,
			code: statusCode,
			message,
			stack: err.stack,
		}

		res.status(statusCode).send(response)
	}
)

app.listen(port, () => {
	console.log('Server is running on port', port)
})
