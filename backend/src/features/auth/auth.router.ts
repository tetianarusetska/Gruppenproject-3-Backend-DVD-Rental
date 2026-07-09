import express from "express"
import authController from "./auth.controller.ts"
import { authErrorHandler, requireAuth } from "./auth.middleware.ts"

const router = express.Router()

router.get("/me", requireAuth, authController.getSelf)

router.post("/login", authController.login)
router.post("/logout", requireAuth, authController.logout)
router.use(authErrorHandler)

export default router