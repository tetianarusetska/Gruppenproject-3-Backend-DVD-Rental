import express from "express"
import languageController from "./language.controller.ts"
import { languageErrorHandler } from "./language.middleware.ts"
import { requireAuth } from "../auth/auth.middleware.ts"

const router = express.Router()

router.get("/", requireAuth, languageController.findAll)
router.get("/:id", requireAuth, languageController.find)
router.use(languageErrorHandler)

export default router