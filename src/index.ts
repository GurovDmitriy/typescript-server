import express from "express"
import { router } from "./routes/loginRoute"
import bodyParser from "body-parser"

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

app.listen(3000, () => {
  console.log("listening on port 3000")
})
