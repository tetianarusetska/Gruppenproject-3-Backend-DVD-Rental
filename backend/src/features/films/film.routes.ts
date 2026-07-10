import express from "express"
import filmController from "./film.controller.ts"
import { filmErrorHandler } from "./film.middleware.ts"
import { requireAuth } from "../auth/auth.middleware.ts"

const router = express.Router()

router.get("/", requireAuth, filmController.findAll)
router.get("/availability", requireAuth, filmController.findAvailability)
router.get("/:id", requireAuth, filmController.find)
router.use(filmErrorHandler)

export default router
