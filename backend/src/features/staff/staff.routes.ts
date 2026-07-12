import express from "express"
import staffController from "./staff.controller.ts"
import { requireAuth } from "../auth/auth.middleware.ts"
import { StaffErrorHandler } from "./staff.middleware.ts";

const staffRouter = express.Router();

staffRouter.get("/all", requireAuth, staffController.getAll);
staffRouter.get("/:staff_id", requireAuth, staffController.getById);
staffRouter.post("/new", requireAuth, staffController.create);


staffRouter.use(StaffErrorHandler);

export default staffRouter