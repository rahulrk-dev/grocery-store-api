import { NextFunction, Request, Response } from 'express'
import ApiError from '../utils/ApiError'
import { IGetUserAuthInfoRequest } from './auth.middleware'

const permission =
	(...roles: Array<number>) =>
	(req: IGetUserAuthInfoRequest, _res: Response, next: NextFunction) => {
		if (!req.user) throw new ApiError(401, 'Unauthorized')

		if (!roles.includes(req.user.role))
			throw new ApiError(403, 'You are not authorized')

		next()
	}

export default permission
