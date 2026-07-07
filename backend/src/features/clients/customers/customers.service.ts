import { type Customer } from "../types/customer.ts"
import customersRepo from "./customers.repo.ts"


async function getAllClients(): Promise<Customer[]> {
    return await customersRepo.getAll();
}

export default {
    getAll: getAllClients
}