import express from "express"
import filmController from "./film.controller.ts"
import { filmErrorHandler } from "./film.middleware.ts"

const router = express.Router()

router.get("/", filmController.findAll)
router.get("/availability", filmController.findAvailability)
router.get("/:id", filmController.find)
router.use(filmErrorHandler)

export default router
