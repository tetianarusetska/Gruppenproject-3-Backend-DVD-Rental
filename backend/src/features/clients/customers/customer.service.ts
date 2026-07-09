import { type Customer } from "../types/customer.ts"
import customerRepo from "./customer.repo.ts"
import { CustomerNotFound, CustomerHasRelatedRecords } from "./customer.errors.ts"
import type { CreateCustomerInput } from "../types/createCustomerInput.ts";
import addressService from "../addresses/address.service.ts"
import type { CustomerRental } from "../types/customerRentals.ts";
import type { CustomerPayment } from "../types/customerPayment.ts";

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


const searchCustomer = async (query: string): Promise<Customer[]> => {
    return customerRepo.search(query);
};


const findCustomerById = async (customer_id: number): Promise<Customer> => {
    const customer = await customerRepo.find(customer_id);

    if (!customer) {
        throw new CustomerNotFound(customer_id);
    }

    return customer;
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

// Rentals, Statistics und so weiter

const getCustomerRentals = async (customer_id: number): Promise<CustomerRental[]> => {
    await findCustomerById(customer_id);
    return await customerRepo.getRentals(customer_id);
};

const getCustomerPayments = async (customer_id: number): Promise<CustomerPayment[]> => {
    await findCustomerById(customer_id);
    return await customerRepo.getPayments(customer_id);
};

export default {
    getAll: getAllCustomers,
    find: findCustomerById,
    delete: deleteCustomerById,
    create: createCustomer,
    search: searchCustomer,
    // Rentals, Statistics und so weiter
    getRentals: getCustomerRentals,
    getPayments: getCustomerPayments
}