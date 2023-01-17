import { NextFunction, Request, Response } from "express"
import { get, controller, use, post, bodyValidator } from "./decorators"
import { router } from "../routes/loginRoute"

export interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined
  }
}

@controller("/auth")
class LoginController {
  @get("/login")
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

  @post("/login")
  @bodyValidator("email", "password")
  postLogin(req: RequestWithBody, res: Response) {
    const { email, password } = req.body

    const emailValid = email === "test@gmail.com"
    const passwordValid = password === "12345"

    if (emailValid && passwordValid) {
      req.session = { loggedIn: true }
      res.redirect("/")
    } else {
      res.send("Invalid email or password")
    }
  }

  @get("/logout")
  getLogout(req: Request, res: Response) {
    req.session = undefined
    res.redirect("/")
  }
}
