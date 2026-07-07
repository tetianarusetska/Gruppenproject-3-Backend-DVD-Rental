import express from "express"
import customersController from "./customers.controller.ts"

const customersRouter = express.Router();

customersRouter.get("/all", customersController.getAll);
customersRouter.get("/:customer_id", customersController.find);

export default customersRouter