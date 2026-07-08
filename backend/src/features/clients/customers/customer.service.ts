import { type Customer } from "../types/customer.ts"
import customerRepo from "./customer.repo.ts"
import { CustomerNotFound, CustomerHasRelatedRecords } from "./customer.errors.ts"
import type { CreateCustomerInput } from "../types/createCustomerInput.ts";
import addressService from "../addresses/address.service.ts"

async function createCustomer(customer: CreateCustomerInput): Promise<Customer> {

    const address = await addressService.create(
        customer.full_address
    );

    return customerRepo.create(
        customer,
        address.address_id
    );
}


async function getAllCustomers(): Promise<Customer[]> {
    return await customerRepo.getAll();
}


async function deleteCustomerById(customer_id: number): Promise<Customer | null> {
    try {
        return await customerRepo.delete(customer_id);
    } catch (err: any) {
        if (err.code === "23503") {
            throw new CustomerHasRelatedRecords(customer_id);
        }
        throw err;
    }
}


const findCustomerById = async (customer_id: number): Promise<Customer> => {
    const customer = await customerRepo.find(customer_id);

    if (!customer) {
        throw new CustomerNotFound(customer_id);
    }

    return customer;
}


export default {
    getAll: getAllCustomers,
    find: findCustomerById,
    delete: deleteCustomerById,
    create: createCustomer
}