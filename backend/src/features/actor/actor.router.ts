import express from "express"
import actorController from "./actor.controller.ts"
import { actorErorHandler } from "./actor.middleware.ts"

const router = express.Router()

router.get("/", actorController.findAll)
router.get("/:id", actorController.find)
router.use(actorErorHandler)

export default router