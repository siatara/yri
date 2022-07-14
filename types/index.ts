import { NextFunction, Request, Response } from 'express'
import { METHOD } from '../src/enums'

export type httpVerbFactory = (path: string) => MethodDecorator
export type ControllerFactory = (path: string) => ClassDecorator

export type Middleware = (
	req: Request,
	res: Response,
	next?: NextFunction
) => void

export type Controller = {
	path: string
	method: METHOD
	controller: Function
}
export type Router = {
	path: string
	module?: string
	children: Controller[]
}
export type Modules = Router[]

type modules = Function

export type BootType = {
	modules: modules[]
	server?: {
		port?: number
		host?: string
	}
	database: {
		uriString: string
	}
}
