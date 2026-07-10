import express from "express"
import categoryController from "./category.controller.ts"
import { categoryErrorHandler } from "./category.middleware.ts"
import { requireAuth } from "../auth/auth.middleware.ts"

const router = express.Router()

router.get("/", requireAuth, categoryController.findAll)
router.get("/:id", requireAuth, categoryController.find)
router.use(categoryErrorHandler)

export default router