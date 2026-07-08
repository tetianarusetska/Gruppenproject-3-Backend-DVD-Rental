import { getPostgresPool } from "../../../db/postgres.pool.ts"
import { type City } from "../types/city.ts"

const pool = getPostgresPool();

const getAllCities = async (): Promise<City[]> => {
    const result = await pool.query<City>(
        `
        SELECT city_id, city, country_id
        FROM city
        `
    )
    return result.rows
}

export default {
    getAll: getAllCities
}