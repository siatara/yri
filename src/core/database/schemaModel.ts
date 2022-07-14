import { Document, Filter, MongoClient, ObjectId } from 'mongodb'
import { ev } from './index'

export class SchemaModel {
	collection: string

	connection: MongoClient | undefined

	constructor(collection: string) {
		ev.once('setClient', (client) => {
			this.connection = client
		})
		this.collection = collection
	}

	async find(filter?: any) {
		try {
			console.time('Querying data')
			const cursor = this.connection
				?.db()
				.collection(this.collection)
				.find(filter || {})
			return (await cursor?.toArray()) as Array<any>
		} catch (e) {
			console.dir(e)
		} finally {
			console.timeEnd('Querying data')
		}
	}

	// Query document
	async findOne(filter: Filter<Document>) {
		try {
			console.time('Querying data')
			filter = {
				...filter,
				_id: filter.hasOwnProperty('_id')
					? new ObjectId(filter._id)
					: undefined
			}

			return await this.connection
				?.db()
				.collection(this.collection)
				.findOne({ ...filter })
		} catch (e) {
			console.dir(e)
		} finally {
			console.timeEnd('Querying data')
		}
	}

	// insert Method
	async insertOne(doc: any) {
		try {
			console.time('writing data')
			return await this.connection
				?.db()
				.collection(this.collection)
				.insertOne(doc)
		} catch (e) {
			console.log(e)
		} finally {
			console.timeEnd('writing data')
		}
	}

	async insertMany(docs: any) {
		try {
			console.time('writing data')
			return await this.connection
				?.db()
				.collection(this.collection)
				.insertMany(docs)
		} catch (e) {
			console.log(e)
		} finally {
			console.timeEnd('writing data')
		}
	}

	// can add document in collection if upsert is set to true
	async updateOne(filter: any, doc: any) {
		try {
			filter = {
				...filter,
				_id: filter.hasOwnProperty('_id')
					? new ObjectId(filter._id)
					: undefined
			}

			console.time('writing data')
			return await this.connection
				?.db()
				.collection(this.collection)
				.updateOne(filter, { $set: { ...doc } })
		} catch (e) {
			console.log(e)
		} finally {
			console.timeEnd('writing data')
		}
	}

	async updateMany(filter: any, docs: any) {
		try {
			console.time('writing data')
			return await this.connection
				?.db()
				.collection(this.collection)
				.updateMany(filter, docs)
		} catch (e) {
			console.log(e)
		} finally {
			console.timeEnd('writing data')
		}
	}

	async deleteOne(filter: any) {
		try {
			console.time('delete data')

			filter = {
				...filter,
				_id: filter.hasOwnProperty('_id')
					? new ObjectId(filter._id)
					: undefined
			}

			return await this.connection
				?.db()
				.collection(this.collection)
				.deleteOne({ ...filter })
		} catch (e) {
			console.log(e)
		} finally {
			console.timeEnd('delete data')
		}
	}

	async deleteMany(filter: Filter<Document>) {
		try {
			console.time('delete many data')
			return await this.connection
				?.db()
				.collection(this.collection)
				.deleteMany({ ...filter })
		} catch (e) {
			console.log(e)
		} finally {
			console.timeEnd('delete many data')
		}
	}

	// coming soon
	bulkWrite() {}

	findAndModify() {}

	findOneAndReplace() {}
}
