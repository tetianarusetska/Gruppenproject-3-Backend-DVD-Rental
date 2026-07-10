import express from "express"
import cityController from "./city.controller.ts"
import { requireAuth } from "../../auth/auth.middleware.ts"

const cityRouter = express.Router();

cityRouter.get("/all", requireAuth, cityController.getAll);

export default cityRouter