import express from "express"
import countryController from "./country.controller.ts"
import { requireAuth } from "../../auth/auth.middleware.ts"

const countryRouter = express.Router();

countryRouter.get("/all", requireAuth, countryController.getAll);

export default countryRouter;