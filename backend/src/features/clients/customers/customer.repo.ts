import { getPostgresPool } from "../../../db/postgres.pool.ts"
import type { CreateCustomerInput } from "../types/createCustomerInput.ts";
import { type Customer } from "../types/customer.ts"
import type { CustomerRental } from "../types/customerRentals.ts";
import type { CustomerPayment } from "../types/customerPayment.ts";

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


const searchCustomer = async (query: string): Promise<Customer[]> => {

    const result = await pool.query(
        `
        ${CUSTOMER_QUERY}
        WHERE
            LOWER(c.first_name) LIKE LOWER($1)
            OR LOWER(c.last_name) LIKE LOWER($1)
            OR LOWER(c.email) LIKE LOWER($1)
        ORDER BY c.last_name, c.first_name
        `,
        [`%${query}%`]
    );

    return result.rows.map(mapRowToCustomer);
}

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


// Rentals, Statistics und so weiter

const getCustomerRentals = async (customer_id: number): Promise<CustomerRental[]> => {
    const result = await pool.query(
        `
        SELECT
            r.rental_id,
            r.rental_date,
            r.return_date,
            f.film_id,
            f.title
        FROM rental r
        JOIN inventory i
            ON r.inventory_id = i.inventory_id
        JOIN film f
            ON i.film_id = f.film_id
        WHERE r.customer_id = $1
        ORDER BY r.rental_date DESC
        `,
        [customer_id]
    );

    return result.rows.map(row => ({
        rental_id: row.rental_id,
        rental_date: row.rental_date,
        return_date: row.return_date,
        film: {
            film_id: row.film_id,
            title: row.title
        }
    }));
};


const getCustomerPayments = async (customer_id: number): Promise<CustomerPayment[]> => {
    const result = await pool.query(
        `
        SELECT
            p.payment_id,
            p.payment_date,
            p.amount,
            p.staff_id,
            p.rental_id,
            f.film_id,
            f.title
        FROM payment p
        JOIN rental r
        ON p.rental_id = r.rental_id
        JOIN inventory i
        ON r.inventory_id = i.inventory_id
        JOIN film f
        ON i.film_id = f.film_id
        WHERE r.customer_id = $1
        ORDER BY p.payment_date DESC
        `,
        [customer_id]
    );

    return result.rows.map(row => ({
        payment_id: row.payment_id,
        payment_date: row.payment_date,
        amount: row.amount,
        staff_id: row.staff_id,
        rental_id: row.rental_id,
        film: {
            film_id: row.film_id,
            title: row.title
        }
    }));
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