import { type Customer } from "../types/customer.ts"
import customersRepo from "./customers.repo.ts"
import { CustomerNotFound } from "./customers.errors.ts"


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

export default {
    getAll: getAllClients,
    find: findCustomerById
}