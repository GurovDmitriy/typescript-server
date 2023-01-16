import "reflect-metadata"
import { RouterApp } from "../../RouterApp"
import { Methods } from "./Methods"
import { MetadataKeys } from "./MetadataKeys"

export function controller(routePrefix: string) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (target: Function) {
    const router = RouterApp.instance

    for (const key in target.prototype) {
      const routerHandler = target.prototype[key]
      const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key)
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      )

      const middlewares = Reflect.getMetadata(
        MetadataKeys.middleware,
        target.prototype,
        key
      )

      if (path) {
        router[method](`${routePrefix}${path}`, ...middlewares, routerHandler)
      }
    }
  }
}
