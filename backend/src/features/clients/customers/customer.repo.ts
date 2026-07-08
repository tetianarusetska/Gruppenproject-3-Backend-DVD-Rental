import { getPostgresPool } from "../../../db/postgres.pool.ts"
import type { CreateCustomerInput } from "../types/createCustomerInput.ts";
import { type Customer } from "../types/customer.ts"

const pool = getPostgresPool();

const CUSTOMER_QUERY = `
    SELECT
        c.customer_id,
        c.store_id,
        c.first_name,
        c.last_name,
        c.email,
        co.country_id,
        co.country,
        ci.city_id,
        ci.city,
        a.postal_code,
        a.district,
        a.address_id,
        a.address,
        a.phone
    FROM customer c
    JOIN address a ON c.address_id = a.address_id
    JOIN city ci ON a.city_id = ci.city_id
    JOIN country co ON ci.country_id = co.country_id
`;

function mapRowToCustomer(row: any): Customer {
    return {
        customer_id: row.customer_id,
        store_id: row.store_id,
        first_name: row.first_name,
        last_name: row.last_name,
        email: row.email,
        full_address: {
            country_id: row.country_id,
            country: row.country,
            city_id: row.city_id,
            city: row.city,
            postal_code: row.postal_code,
            district: row.district,
            address_id: row.address_id,
            address: row.address,
            phone: row.phone
        }
    };
}

const createCustomer = async (customer: CreateCustomerInput, address_id: number): Promise<Customer> => {

    const result = await pool.query(
        `
        INSERT INTO customer
        (
            store_id,
            first_name,
            last_name,
            email,
            address_id

        )
        VALUES ($1,$2,$3,$4,$5)
        RETURNING customer_id
        `,
        [
            customer.store_id,
            customer.first_name,
            customer.last_name,
            customer.email,
            address_id
        ]
    );

    return await findCustomerById(
        result.rows[0].customer_id
    ) as Customer;
};


const getAllCustomers = async (): Promise<Customer[]> => {
    const result = await pool.query(CUSTOMER_QUERY);
    return result.rows.map(mapRowToCustomer);
}


const deleteCustomerById = async (customer_id: number): Promise<Customer | null> => {

    const customer = await findCustomerById(customer_id);

    if (!customer) {
        return null;
    }

    await pool.query(
        `DELETE FROM customer WHERE customer_id = $1`,
        [customer_id]
    );

    return customer;
};

const findCustomerById = async (customer_id: number): Promise<Customer | null> => {

    const result = await pool.query(
        `${CUSTOMER_QUERY} WHERE c.customer_id = $1`,
        [customer_id]
    )

    const row = result.rows[0];

    if (!row) {
        return null;
    }

    return mapRowToCustomer(row);
}

export default {
    getAll: getAllCustomers,
    find: findCustomerById,
    delete: deleteCustomerById,
    create: createCustomer
}