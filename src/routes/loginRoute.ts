import { Router, Request, Response, NextFunction } from "express"

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined
  }
}

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

const router = Router()

router.get("/", (req, res) => {
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
        <a href="/login">Login</a>
    </div>
  `)
  }
})

router.get("/login", (req, res) => {
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
})

router.post("/login", (req: RequestWithBody, res) => {
  const { email, password } = req.body

  console.log(req.body)

  const emailValid = email && email === "test@gmail.com"
  const passwordValid = email && password === "12345"

  if (emailValid && passwordValid) {
    req.session = { loggedIn: true }
    res.redirect("/")
  } else {
    res.send("Invalid email or password")
  }
})

router.get("/logout", (req, res) => {
  req.session = undefined
  res.redirect("/")
})

router.get("/protected", requireAuth, (req, res) => {
  res.send(`
    <div>
      <div>Welcome to protected route, logged in user</div>
    </div>
  `)
})

export { router }
