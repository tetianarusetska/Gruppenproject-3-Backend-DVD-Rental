import { type Customer } from "../types/customer.ts"
import customersRepo from "./customers.repo.ts"
import { CustomerNotFound, CustomerHasRelatedRecords } from "./customers.errors.ts"


async function getAllClients(): Promise<Customer[]> {
    return await customersRepo.getAll();
}

const findCustomerById = async (customer_id: number): Promise<Customer> => {
    const customer = await customersRepo.find(customer_id);

    if (!customer) {
        throw new CustomerNotFound(customer_id);
    }

    return customer;
}

async function deleteCustomerById(customer_id: number): Promise<Customer | undefined> {
    try {
        return await customersRepo.delete(customer_id);
    } catch (err: any) {
        if (err.code === "23503") {
            throw new CustomerHasRelatedRecords(customer_id);
        }
        throw err;
    }
}

export default {
    getAll: getAllClients,
    find: findCustomerById,
    delete: deleteCustomerById
}