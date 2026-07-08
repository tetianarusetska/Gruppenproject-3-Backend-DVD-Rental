import express from "express"
import cityController from "./city.controller.ts"

const cityRouter = express.Router();

cityRouter.get("/all", cityController.getAll);

export default cityRouter