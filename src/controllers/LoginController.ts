import { Request, Response } from "express"
import { get, controller } from "./decorators"

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
}
