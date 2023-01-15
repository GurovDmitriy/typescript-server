import "reflect-metadata"
import { RouterApp } from "../../RouterApp"

export function controller(routePrefix: string) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (target: Function) {
    const router = RouterApp.instance

    for (const key in target.prototype) {
      const routerHandler = target.prototype[key]
      const path = Reflect.getMetadata("path", target.prototype, key)

      if (path) {
        router.get(`${routePrefix}${path}`, routerHandler)
      }
    }
  }
}
