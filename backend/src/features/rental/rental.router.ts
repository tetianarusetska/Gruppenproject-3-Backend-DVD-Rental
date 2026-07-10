import express from "express"
import rentalController from "./rental.controller.ts"
import { rentalErrorHandler } from "./rental.middleware.ts"
import { requireAuth } from "../auth/auth.middleware.ts"

const router = express.Router()

router.get("/", requireAuth, rentalController.findAll)
router.get("/active", requireAuth, rentalController.findActive)
router.get("/search", requireAuth, rentalController.findAvailability)
router.get("/:id", requireAuth, rentalController.find)
router.use(rentalErrorHandler)

export default router