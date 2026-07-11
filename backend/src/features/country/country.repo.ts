import { getPostgresPool } from "../../db/postgres.pool.ts"
import { type Country } from "./types/country.ts"

const pool = getPostgresPool();

const getAllCountries = async (): Promise<Country[]> => {
    const result = await pool.query<Country>(
        `
        SELECT country_id, country
        FROM country
        `
    )
    return result.rows
}

async function getCountryById(country_id: number): Promise<Country | null> {
    const result = await pool.query(
        `
        SELECT country_id, country
        FROM country
        WHERE country_id = $1
        `,
        [country_id]
    );

    return result.rows[0] ?? null;
}

export default {
    getAll: getAllCountries,
    getById: getCountryById
}