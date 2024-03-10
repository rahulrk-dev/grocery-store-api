import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import ApiError from '../utils/ApiError'
import config from '../config'
import Roles from '../config/roles'

export interface IGetUserAuthInfoRequest extends Request {
	user: {
		id: number
		role: Roles
	}
}

const authenticate = async (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	const [type, token] = req.headers.authorization?.split(' ') ?? []

	try {
		if (type !== 'Bearer' || !token) throw 'err'

		const verify = await jwt.verify(token, config.jwt.secret)

		req['user'] = { id: verify.sub, role: verify.role }

		next()
	} catch (e) {
		next(new ApiError(401, 'Unauthorized'))
	}
}

export default authenticate
