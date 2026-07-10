import express from "express"
import customerController from "./customer.controller.ts"

const customerRouter = express.Router();

customerRouter.get("/all", customerController.getAll);
customerRouter.get("/search", customerController.search);

// Rentals, Paments und so weiter
customerRouter.get("/:customer_id/payments", customerController.getPayments);
customerRouter.get("/:customer_id/rentals", customerController.getRentals);

customerRouter.get("/:customer_id", customerController.find);

// CRUD
customerRouter.put("/update",customerController.update)
customerRouter.delete("/:customer_id", customerController.delete);
customerRouter.post("/new", customerController.create);

// Statistics und so weiter

customerRouter.get("/analytics/new-by-month", customerController.getByMonth);
customerRouter.get("/analytics/by-country", customerController.getByCountry);
customerRouter.get("/analytics/top-renters", customerController.getByRentals);

export default customerRouter