import { NextFunction, Request, Response } from "express"
import { get, controller, use } from "./decorators"

function logger(req: Request, res: Response, next: NextFunction) {
  console.log("request was made")
  next()
}

@controller("/auth")
class LoginController {
  @get("/login")
  @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(`
    <form method="POST" name="form-login">
        <div>
            <div>
                <label for="email-field">Email</label>
                <input type="email" id="email-field" name="email">
            </div>
            <div>
                <label for="password-field">Password</label>
                <input type="password" id="password-field" name="password">
            </div>
            <button type="submit">Submit</button>
        </div>
    </form>
  `)
  }
}
