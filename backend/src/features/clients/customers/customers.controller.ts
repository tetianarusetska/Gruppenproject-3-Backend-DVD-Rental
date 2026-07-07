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

const findCustomerById = async (req: Request<{ customer_id: number }>, res: Response) => {

    const customerId = Number(req.params.customer_id);

    const customer = await customersService.find(customerId)

    res.json(customer)
}

export default {
  getAll: getAllCustomers,
  find: findCustomerById
}