import express from "express"
import filmController from "./film.controller.ts"

const router = express.Router()

router.get("/", filmController.findAll)

export default router