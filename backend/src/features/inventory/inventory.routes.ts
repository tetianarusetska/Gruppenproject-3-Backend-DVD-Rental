import express from "express"
import inventoryController from "./inventory.controller.ts"
import { requireAuth } from "../auth/auth.middleware.ts"
import { InventoryErrorHandler } from "./inventory.middleware.ts";

const inventoryRouter = express.Router();

inventoryRouter.get("/all", requireAuth, inventoryController.getAll);
inventoryRouter.get("/:inventory_id", requireAuth, inventoryController.getById);
inventoryRouter.post("/new", requireAuth, inventoryController.create);

inventoryRouter.use(InventoryErrorHandler);

export default inventoryRouter