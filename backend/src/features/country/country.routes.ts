import express from "express"
import countryController from "./country.controller.ts"
import { requireAuth } from "../auth/auth.middleware.ts"
import { countryErrorHandler } from "./country.middleware.ts";

const countryRouter = express.Router();

countryRouter.get("/all", requireAuth, countryController.getAll);
countryRouter.get("/:country_id", requireAuth, countryController.getById);

countryRouter.use(countryErrorHandler);

export default countryRouter;