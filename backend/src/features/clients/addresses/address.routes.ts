import express from "express"
import addressController from "./address.controller.ts"

const addressRouter = express.Router();

addressRouter.get("/all", addressController.getAll);

export default addressRouter