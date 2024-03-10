export default class ApiError extends Error {
	readonly statusCode: number

	constructor(_statusCode: number, _message: string, _name: string = '') {
		super(_message)
		this.name = _name
		this.statusCode = _statusCode
		Error.captureStackTrace(this, this.constructor)
	}
}
