import "reflect-metadata"
import { RouterApp } from "../../RouterApp"
import { Methods } from "./Methods"
import { MetadataKeys } from "./MetadataKeys"
import { NextFunction, RequestHandler, Response, Request } from "express"

function bodyValidators(keys: string[]): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send("invalid request")
      return
    }

    for (const key of keys) {
      if (!req.body[key]) {
        res.status(422).send("invalid request")
        return
      }
    }

    next()
  }
}

export function controller(routePrefix: string) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (target: Function) {
    console.log(target)
    const router = RouterApp.instance

    for (const key in target.prototype) {
      const routerHandler = target.prototype[key]
      const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key)
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      )

      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        []

      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || []

      const validator = bodyValidators(requiredBodyProps)

      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routerHandler
        )
      }
    }
  }
}
