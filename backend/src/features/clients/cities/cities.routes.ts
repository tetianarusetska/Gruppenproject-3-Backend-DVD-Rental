import express from "express"
import citiesController from "./cities.controller.ts"

const citiesRouter = express.Router();

citiesRouter.get("/all", citiesController.getAll);

export default citiesRouter