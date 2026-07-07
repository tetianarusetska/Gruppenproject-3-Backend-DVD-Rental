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

export default {
    getAll: getAllCustomers
}