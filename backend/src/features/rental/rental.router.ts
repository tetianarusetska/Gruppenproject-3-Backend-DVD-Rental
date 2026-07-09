import express from "express"
import rentalController from "./rental.controller.ts"
import { rentalErrorHandler } from "./rental.middleware.ts"

const router = express.Router()

router.get("/", rentalController.findAll)
router.get("/active", rentalController.findActive)
router.get("/search", rentalController.findAvailability)
router.get("/:id", rentalController.find)
router.use(rentalErrorHandler)

export default router