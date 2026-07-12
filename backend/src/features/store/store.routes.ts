import express from "express"
import storeController from "./store.controller.ts"
import { requireAuth } from "../auth/auth.middleware.ts"
import { StoreErrorHandler } from "./store.middleware.ts";

const storeRouter = express.Router();

storeRouter.get("/all", requireAuth, storeController.getAll);
storeRouter.get("/:storeP_id", requireAuth, storeController.getById);
storeRouter.post("/new", requireAuth, storeController.create);


storeRouter.use(StoreErrorHandler);

export default storeRouter