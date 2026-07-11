import express from "express"
import cityController from "./city.controller.ts"
import { requireAuth } from "../auth/auth.middleware.ts"
import { CityErrorHandler } from "./city.middleware.ts";

const cityRouter = express.Router();

cityRouter.get("/all", requireAuth, cityController.getAll);
cityRouter.get("/:city_id", cityController.getById);

cityRouter.use(CityErrorHandler);

export default cityRouter