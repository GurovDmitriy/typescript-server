import express, { Request, Response, NextFunction } from "express"

const router = express.Router()

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
        <a href="/auth/login">Login</a>
    </div>
  `)
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
