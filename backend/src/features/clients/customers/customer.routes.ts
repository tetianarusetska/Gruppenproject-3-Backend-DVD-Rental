import express from "express"
import customerController from "./customer.controller.ts"

const customerRouter = express.Router();

customerRouter.get("/all", customerController.getAll);
customerRouter.get("/:customer_id", customerController.find);
customerRouter.delete("/:customer_id", customerController.delete);

export default customerRouter