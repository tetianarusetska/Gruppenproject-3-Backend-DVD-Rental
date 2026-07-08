import express from "express"
import categoryController from "./category.controller.ts"
import { categoryErrorHandler } from "./category.middleware.ts"

const router = express.Router()

router.get("/", categoryController.findAll)
router.get("/:id", categoryController.find)
router.use(categoryErrorHandler)

export default router