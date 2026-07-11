import express from "express"
import addressController from "./address.controller.ts"
import { requireAuth } from "../auth/auth.middleware.ts"
import { AddressErrorHandler } from "./address.middleware.ts"

const addressRouter = express.Router();

addressRouter.get("/all", requireAuth, addressController.getAll);
addressRouter.get("/:address_id", requireAuth, addressController.getById);

addressRouter.post("/new", requireAuth, addressController.create);
addressRouter.put("/update", requireAuth, addressController.update);

addressRouter.use(AddressErrorHandler);

export default addressRouter