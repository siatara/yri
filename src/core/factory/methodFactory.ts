import { Controller } from '../../types'
import { MetaDataKeys, METHOD } from '../../enums'

const { hasMetadata, getMetadata } = Reflect

export const methodFactory = (method: METHOD) => {
	return (path: string = '/'): MethodDecorator => {
		return (
			target: Object,
			key: string | symbol,
			descriptor: PropertyDescriptor
		) => {
			const controller: Controller = {
				path: /^\//.test(path) ? path : `/${path}`,
				method: method,
				controller: descriptor.value
			}

			const { constructor } = target

			const controllers: Controller[] = hasMetadata(
				MetaDataKeys.controller,
				constructor
			)
				? getMetadata(MetaDataKeys.controller, constructor)
				: []

			controllers?.push(controller)

			Reflect.defineMetadata(
				MetaDataKeys.controller,
				controllers,
				constructor
			)
		}
	}
}
