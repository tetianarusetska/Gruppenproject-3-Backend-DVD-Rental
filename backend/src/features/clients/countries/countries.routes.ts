import express from "express"
import countriesController from "./countries.controller.ts"

const countriesRouter = express.Router();

countriesRouter.get("/all", countriesController.getAll);

export default countriesRouter