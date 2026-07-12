import express from "express"
import customerController from "./customer.controller.ts"
import { customersErrorHandler } from "./customer.middleware.ts";
import { requireAuth } from "../auth/auth.middleware.ts"

const customerRouter = express.Router();

customerRouter.get("/all", requireAuth, customerController.getAll);
customerRouter.get("/search", requireAuth, customerController.search);

// Rentals, Paments und so weiter
customerRouter.get("/:customer_id/payments", requireAuth, customerController.getPayments);
customerRouter.get("/:customer_id/rentals", requireAuth, customerController.getRentals);

customerRouter.get("/:customer_id", requireAuth, customerController.find);

// CRUD
customerRouter.post("/update", requireAuth,customerController.update)
customerRouter.delete("/:customer_id", requireAuth, customerController.delete);
customerRouter.post("/new", requireAuth, customerController.create);

// Statistics und so weiter

customerRouter.get("/analytics/new-by-month", requireAuth, customerController.getByMonth);
customerRouter.get("/analytics/by-country", requireAuth, customerController.getByCountry);
customerRouter.get("/analytics/top-renters", requireAuth, customerController.getByRentals);

// error handling 

customerRouter.use(customersErrorHandler);

export default customerRouter