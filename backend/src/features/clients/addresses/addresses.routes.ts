import express from "express"
import addressesController from "./addresses.controller.ts"

const addressesRouter = express.Router();

addressesRouter.get("/all", addressesController.getAll);

export default addressesRouter