import { getPostgresPool } from "../../../db/postgres.pool.ts"
import { type Country } from "../types/country.ts"

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

export default {
    getAll: getAllCountries
}