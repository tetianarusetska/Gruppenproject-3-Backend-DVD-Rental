import express from "express"
import addressController from "./address.controller.ts"

const addressRouter = express.Router();

addressRouter.get("/all", addressController.getAll);
addressRouter.post("/new", addressController.create);
addressRouter.put("/update", addressController.update);


export default addressRouter