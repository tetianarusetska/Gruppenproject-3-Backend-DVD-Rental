import type { Response, NextFunction } from "express";
import type { Request } from "./types/request.ts";
import customerService from "./customer.service.ts"


const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const createdCustomer = await customerService.create(req.body);

        return res.status(201).json(createdCustomer);

    } catch (err) {
        next(err);
    }
};


const updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedCustomer = await customerService.update(req.body);

        return res.status(200).json(updatedCustomer);

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


const findCustomerById = async (req: Request<{ customer_id: string }>, res: Response, next: NextFunction) => {
    try {
        const customerId = Number(req.params.customer_id);

        if (isNaN(customerId)) {
            return res.status(400).json({ error: "Ungültige Kunden-ID angegeben." });
        }

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

// Rentals, Payments und so weiter

const getCustomerRentals = async (req: Request<{ customer_id: string }>, res: Response, next: NextFunction) => {
    try {
        const customerId = Number(req.params.customer_id);
        const rentals = await customerService.getRentals(customerId);
        res.status(200).json(rentals);
    } catch (err) {
        next(err);
    }
}

const getCustomerPayments = async (req: Request<{ customer_id: string }>, res: Response, next: NextFunction) => {
    try {
        const customerId = Number(req.params.customer_id);
        const payments = await customerService.getPayments(customerId);
        res.status(200).json(payments);
    } catch (err) {
        next(err);
    }
}

// Statistics und so weiter

const getNewCustomersByMonth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await customerService.getByMonth();
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

const getCustomersByCountry = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await customerService.getByCountry();
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

const getTopCustomersByRentals = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const limit = req.query.limit ? Number(req.query.limit) : undefined;
        const data = await customerService.getByRentals(limit);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
};

export default {
    getAll: getAllCustomers,
    find: findCustomerById,
    delete: deleteCustomerById,
    create: createCustomer,
    search: searchCustomer,
    update: updateCustomer,
    // Rentals, Statistics und so weiter
    getRentals: getCustomerRentals,
    getPayments: getCustomerPayments,
    // Statistics und so weiter
    getByMonth: getNewCustomersByMonth,
    getByCountry: getCustomersByCountry,
    getByRentals: getTopCustomersByRentals
}