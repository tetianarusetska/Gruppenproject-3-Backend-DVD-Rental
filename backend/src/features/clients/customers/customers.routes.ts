import express from "express"
import customersController from "./customers.controller.ts"

const customersRouter = express.Router();

customersRouter.get("/all", customersController.getAll);

export default customersRouter