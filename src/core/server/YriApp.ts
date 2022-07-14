import { Controller, Modules } from '../../../types'
import { MetaDataKeys } from '../../enums'

import cors from 'cors'
import bodyParser from 'body-parser'
import express, { Application } from 'express'

class YriApp {
	constructor(config: { modules: Function[] }) {
		this.app = express()
		this.initCors()
		this.initBodyParser()
		this.initRoutes(config.modules)
	}

	app: Application

	private initBodyParser() {
		this.app.use(bodyParser.json())
		this.app.use(bodyParser.urlencoded({ extended: true }))
	}

	private initCors() {
		this.app.use(cors())
	}

	private initRoutes(moduleClasses: Function[]) {
		moduleClasses.forEach((moduleClass) => {
			const moduleYri: Modules = Reflect.getMetadata(
				MetaDataKeys.modules,
				moduleClass
			)

			const controllers: Controller[] = Reflect.getMetadata(
				MetaDataKeys.controller,
				moduleClass
			)

			moduleYri.forEach(({ path: parentPath }) => {
				const router = express.Router()

				controllers.forEach(({ path, method, controller }) => {
					router[method](path, controller())
				})
				this.app.use(parentPath, router)
			})
		})
	}
}

export default YriApp
