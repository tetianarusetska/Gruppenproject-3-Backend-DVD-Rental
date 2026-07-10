import express from "express"
import actorController from "./actor.controller.ts"
import { actorErorHandler } from "./actor.middleware.ts"
import { requireAuth } from "../auth/auth.middleware.ts"

const router = express.Router()

router.get("/", requireAuth, actorController.findAll)
router.get("/:id", requireAuth, actorController.find)
router.use(actorErorHandler)

export default router