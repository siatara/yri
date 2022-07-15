import 'reflect-metadata'
import { BootType } from '../../types'
import YriApp from './YriApp'
import { createServer, Server as HttpServer } from 'http'
import { MongoClient } from 'mongodb'
import { ev } from '../database'

export class YriServer {
	constructor() {
		this.instance = createServer(() => {})
	}

	private instance: HttpServer

	boot(config: BootType) {
		const { modules, database } = config
		const { app } = new YriApp({ modules })

		this.instance = createServer(app)

		const db = new MongoClient(database.uriString)
		console.time('opening mongoDb connection...')
		db.connect()
			.then((client) => ev.emit('setClient', client))
			.finally(() => console.timeEnd('opening mongoDb connection...'))

		this.run(config.server?.port!, config.server?.host!)
	}

	private run(port?: number, host?: string) {
		this.instance.listen({
			host: host || 'localhost',
			port
		})
	}

	handleListening(message: string) {
		this.instance.on('listening', () => console.log(message))
	}

	handleError(title: string) {
		this.instance.on('error', ({ message }) => {
			throw new Error(
				JSON.stringify({
					title: title || 'Server Error',
					message
				})
			)
		})
	}
}
