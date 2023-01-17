import express from "express"
import bodyParser from "body-parser"
import cookieSession from "cookie-session"
import "./controllers/LoginController"
import "./controllers/RootController"
import { RouterApp } from "./RouterApp"

const app = express()
const routerApp = RouterApp.instance

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({ keys: ["test123"] }))
app.use(routerApp)

app.listen(3000, () => {
  console.log("listening on port 3000")
})
