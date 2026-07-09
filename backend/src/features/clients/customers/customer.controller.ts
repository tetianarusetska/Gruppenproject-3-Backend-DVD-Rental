import type { Response, NextFunction } from "express";
import type { Request } from "../types/request.ts";
import customerService from "./customer.service.ts"


const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const createdCustomer = await customerService.create(req.body);

        return res.status(201).json(createdCustomer);

    } catch (err) {
        next(err);
    }
};


const getAllCustomers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = await customerService.getAll();
        res.status(200).json(customer);
    } catch (err) {
        next(err);
    }
};


const searchCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = String(req.query.q || "");
        const customers = await customerService.search(query);
        res.status(200).json(customers);
    } catch (err) {
        next(err);
    }
}


const findCustomerById = async (req: Request<{ customer_id: number }>, res: Response, next: NextFunction) => {
    try {
        const customerId = Number(req.params.customer_id);
        const customer = await customerService.find(customerId);
        res.status(200).json(customer);
    } catch (err) {
        next(err);
    }
}


const deleteCustomerById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customerId = Number(req.params.customer_id);

        const deletedCustomer = await customerService.delete(customerId);

        if (!deletedCustomer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        return res.status(200).json({
            message: "Kunde erfolgreich gelöscht.",
            customer: deletedCustomer
        });

    } catch (err) {
        next(err);
    }
};

// Rentals, Statistics und so weiter

const getCustomerRentals = async (req: Request<{ customer_id: number }>, res: Response, next: NextFunction) => {
    try {
        const customerId = Number(req.params.customer_id);
        const rentals = await customerService.getRentals(customerId);
        res.status(200).json(rentals);
    } catch (err) {
        next(err);
    }
}

export default {
    getAll: getAllCustomers,
    find: findCustomerById,
    delete: deleteCustomerById,
    create: createCustomer,
    search: searchCustomer,
    // Rentals, Statistics und so weiter
    getRentals: getCustomerRentals
}