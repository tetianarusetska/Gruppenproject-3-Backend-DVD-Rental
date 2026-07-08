import express from "express"
import languageController from "./language.controller.ts"
import { languageErrorHandler } from "./language.middleware.ts"

const router = express.Router()

router.get("/", languageController.findAll)
router.get("/:id", languageController.find)
router.use(languageErrorHandler)

export default router