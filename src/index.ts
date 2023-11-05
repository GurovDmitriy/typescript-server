import express from "express"
import bodyParser from "body-parser"
import "./controllers/LoginController"
import "./controllers/RootController"
import cookieSession from "cookie-session"
import { controller as controllerRouter } from "./controllers/decorators"
import "./controllers/LoginController"
import "./controllers/RootController"
import { RouterApp } from "./RouterApp"

const app = express()
const router = RouterApp.instance

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({ keys: ["test123"] }))
app.use(controllerRouter)
app.use(router)

app.listen(3000, () => {
  console.log("listening on port 3000")
})
