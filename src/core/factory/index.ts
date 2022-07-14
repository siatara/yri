import { methodFactory } from './methodFactory'
import { METHOD } from '../../enums'

export * from './classFactory'
export const Get = methodFactory(METHOD.GET)
export const Post = methodFactory(METHOD.POST)
export const Put = methodFactory(METHOD.PUT)
export const Patch = methodFactory(METHOD.PATCH)
export const Delete = methodFactory(METHOD.DELETE)
