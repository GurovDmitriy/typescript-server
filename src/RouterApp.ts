import express from "express"

export class RouterApp {
  private static _instance: express.Router

  static get instance(): express.Router {
    if (!RouterApp._instance) {
      RouterApp._instance = express.Router()
    }

    return RouterApp._instance
  }
}
