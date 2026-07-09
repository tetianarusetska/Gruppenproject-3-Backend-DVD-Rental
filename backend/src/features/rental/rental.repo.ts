import { getPostgresPool } from "../../db/postgres.pool.ts";
import type { Rental } from "./types/Rental.ts";

const pool = getPostgresPool()

const findRental = async (id: number): Promise<Rental | null> => {
    const result = await pool.query<Rental>(
        `
        SELECT
        r.rental_id,
        r.rental_date,
        r.return_date,
        c.first_name AS customer_first_name,
        c.last_name AS customer_last_name,
        f.title AS film_title
        
        FROM public.rental r
        
        JOIN public.customer c
        ON r.customer_id = c.customer_id

        JOIN public.inventory i
        ON r.inventory_id = i.inventory_id

        JOIN public.film f
        ON i.film_id = f.film_id

        WHERE r.rental_id = $1;
        `,
        [id]
    )

    return result.rows[0] ?? null
}

const findAllRentals = async (): Promise<Rental[]> => {
    const result = await pool.query<Rental>(
        `
        SELECT
        r.rental_id,
        r.rental_date,
        r.return_date,
        c.first_name AS customer_first_name,
        c.last_name AS customer_last_name,
        f.title AS film_title
        
        FROM public.rental r
        
        JOIN public.customer c
        ON r.customer_id = c.customer_id

        JOIN public.inventory i
        ON r.inventory_id = i.inventory_id

        JOIN public.film f
        ON i.film_id = f.film_id

        ORDER BY r.rental_date DESC
        LIMIT 50;
        `
    )

    return result.rows
}

const findRentalsActive = async (): Promise<Rental[]> => {
    const result = await pool.query<Rental>(
        `
        SELECT
        r.rental_id,
        r.rental_date,
        r.return_date,
        c.first_name AS customer_first_name,
        c.last_name AS customer_last_name,
        f.title AS film_title
        
        FROM public.rental r
        
        JOIN public.customer c
        ON r.customer_id = c.customer_id

        JOIN public.inventory i
        ON r.inventory_id = i.inventory_id

        JOIN public.film f
        ON i.film_id = f.film_id

        WHERE r.return_date IS NULL

        ORDER BY r.rental_date DESC
        LIMIT 50;
        `
    )

    return result.rows
}

const findRentalsAvailability = async (name: string): Promise<Rental[]> => {
    const result = await pool.query<Rental>(
        `
        SELECT
        r.rental_id,
        r.rental_date,
        r.return_date,
        c.first_name AS customer_first_name,
        c.last_name AS customer_last_name,
        f.title AS film_title
        
        FROM public.rental r
        
        JOIN public.customer c
        ON r.customer_id = c.customer_id

        JOIN public.inventory i
        ON r.inventory_id = i.inventory_id

        JOIN public.film f
        ON i.film_id = f.film_id

        WHERE c.first_name ILIKE $1
        OR c.last_name ILIKE $1

        ORDER BY r.rental_date DESC
        LIMIT 50;
        `,
        [`%${name}%`]
    )

    return result.rows
}

export default {
    find: findRental,
    findAll: findAllRentals,
    findActive: findRentalsActive,
    findAvailability: findRentalsAvailability
}