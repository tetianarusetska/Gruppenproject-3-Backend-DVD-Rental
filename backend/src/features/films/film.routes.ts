import express from "express"
import filmController from "./film.controller.ts"
import { filmErrorHandler } from "./film.middleware.ts"
import { requireAuth } from "../auth/auth.middleware.ts"

const router = express.Router()

router.get("/", requireAuth, filmController.findAll)
router.get("/availability", requireAuth, filmController.findAvailability)
router.get("/:id", requireAuth, filmController.find)
router.post("/create", requireAuth, filmController.create);
router.put("/:id", requireAuth, filmController.update);
router.delete("/:id", requireAuth, filmController.delete);
router.use(filmErrorHandler)

export default router
