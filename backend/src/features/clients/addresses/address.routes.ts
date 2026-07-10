import express from "express"
import addressController from "./address.controller.ts"
import { requireAuth } from "../../auth/auth.middleware.ts"

const addressRouter = express.Router();

addressRouter.get("/all", requireAuth, addressController.getAll);
addressRouter.post("/new", requireAuth, addressController.create);
addressRouter.put("/update", requireAuth, addressController.update);


export default addressRouter