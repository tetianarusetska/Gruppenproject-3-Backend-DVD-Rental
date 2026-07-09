import express from "express"
import customerController from "./customer.controller.ts"

const customerRouter = express.Router();

customerRouter.get("/all", customerController.getAll);
customerRouter.get("/search", customerController.search);
customerRouter.get("/:customer_id/rentals", customerController.getRentals);
customerRouter.get("/:customer_id", customerController.find);
customerRouter.delete("/:customer_id", customerController.delete);
customerRouter.post("/new", customerController.create);

export default customerRouter