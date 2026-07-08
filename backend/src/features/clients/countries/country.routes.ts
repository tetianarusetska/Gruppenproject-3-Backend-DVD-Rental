import express from "express"
import countryController from "./country.controller.ts"

const countryRouter = express.Router();

countryRouter.get("/all", countryController.getAll);

export default countryRouter;