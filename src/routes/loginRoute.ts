import { Router } from "express"

const router = Router()

router.get("/login", (req, res) => {
  res.send(`
    <form method="POST">
        <div>
            <div>
                <label for="email-field">Email</label>
                <input type="email" id="email-field">
            </div>
            <div>
                <label for="password-field">Password</label>
                <input type="password" id="password-field">
            </div>
            <button type="submit">Submit</button>
        </div>
    </form>
  `)
})

router.post("/login", (req, res) => {
  const { email, password } = req.body

  res.sendStatus(200)
})

export { router }
