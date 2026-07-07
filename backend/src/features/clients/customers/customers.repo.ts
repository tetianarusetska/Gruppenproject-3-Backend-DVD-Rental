import { getPostgresPool } from "../../../db/postgres.pool.ts"
import { type Customer } from "../types/customer.ts"

const pool = getPostgresPool();

const getAllCustomers = async (): Promise<Customer[]> => {
    const result = await pool.query<Customer>(
        `
        SELECT customer_id, first_name, last_name, email
        FROM customer
        `
    )
    return result.rows
}

const findCustomerById = async (customer_id: number): Promise<Customer | null> => {

    const result = await pool.query<Customer>(
        `
        SELECT customer_id, first_name, last_name, email 
        FROM customer
        WHERE customer_id = $1
        `,
        [customer_id]
    )
    return result.rows[0] ?? null
}

export default {
    getAll: getAllCustomers,
    find: findCustomerById
}