import { NextFunction, Request, Response } from "express"
import { controller, get, use } from "./decorators"

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req?.session?.loggedIn) {
    next()
    return
  }

  res.status(403)
  res.send(`
    <div>
        <div>Not permitted</div>
        <a href="/">Go home</a>
    </div>
  `)
}

@controller("")
export class RootController {
  @get("/")
  getRoot(req: Request, res: Response) {
    if (req?.session?.loggedIn) {
      res.send(`
        <div>
          <div>You are login</div>
          <a href="/logout">Logout</a>
        </div>
      `)
    } else {
      res.send(`
    <div>
      <div>You are not login</div>
      <a href="/auth/login">Login</a>
    </div>
  `)
    }
  }

  @get("/protected")
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send(`
    <div>
      <div>Welcome to protected route, logged in user</div>
    </div>
  `)
  }
}
