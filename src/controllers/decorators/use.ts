import "reflect-metadata"
import { RequestHandler } from "express"
import { MetadataKeys } from "./MetadataKeys"

export function use(middleware: RequestHandler) {
  return function (target: object, key: string) {
    const middlewares =
      Reflect.getMetadata(MetadataKeys.middleware, target, key) || []

    middlewares.push(middleware)

    Reflect.defineMetadata(
      MetadataKeys.middleware,
      [...middlewares, middleware],
      target,
      key,
    )
  }
}
