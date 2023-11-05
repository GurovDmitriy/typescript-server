import "reflect-metadata"
import { Methods } from "./Methods"
import { MetadataKeys } from "./MetadataKeys"
import { RequestHandler } from "express"

export interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler
}

function routeBinder(method: string) {
  return function get(path: string) {
    return function (target: object, key: string) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key)
      Reflect.defineMetadata(MetadataKeys.method, method, target, key)
    }
  }
}

const get = routeBinder(Methods.get)
const put = routeBinder(Methods.put)
const post = routeBinder(Methods.post)
const del = routeBinder(Methods.del)
const patch = routeBinder(Methods.patch)

export { get, put, post, del, patch }
