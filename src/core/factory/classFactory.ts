import { ControllerFactory, Modules, Router } from '../../../types'
import { MetaDataKeys } from '../../enums'

const { hasMetadata, getMetadata } = Reflect

export const ModuleYri: ControllerFactory = (path?: string): ClassDecorator => {
	return (constructor: Function) => {
		const router: Router = {
			module: constructor.name,
			path: path || '/',
			children: []
		}

		const yriModules: Modules = hasMetadata(
			MetaDataKeys.modules,
			constructor
		)
			? getMetadata(MetaDataKeys.modules, constructor)
			: []

		if (yriModules.find((a) => a.path === path)) {
			console.log('Error', "Module's path already exist", path)
		} else {
			Reflect.defineMetadata(
				MetaDataKeys.modules,
				[...yriModules, router],
				constructor
			)
		}
	}
}
