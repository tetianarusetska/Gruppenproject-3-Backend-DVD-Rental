import type { Response, NextFunction } from "express";
import type { Request } from "../types/request.ts";
import customersService from "./customers.service.ts"

const getAllCustomers = async (req: Request, res: Response, next: NextFunction) => {
  try {
        const customers = await customersService.getAll();
        res.status(200).json(customers);
    } catch (err) {
        next(err);
    }
};

export default {
  getAll: getAllCustomers
}