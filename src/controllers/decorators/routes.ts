import "reflect-metadata"

function routeBinder(method: string) {
  return function get(path: string) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
      Reflect.defineMetadata("path", path, target, key)
      Reflect.defineMetadata("method", method, target, key)
    }
  }
}

const get = routeBinder("get")
const put = routeBinder("put")
const post = routeBinder("post")
const del = routeBinder("delete")
const patch = routeBinder("patch")

export { get, put, post, del, patch }
