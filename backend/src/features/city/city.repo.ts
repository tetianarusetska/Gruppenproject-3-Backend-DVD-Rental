import { getPostgresPool } from "../../db/postgres.pool.ts"
import { type City } from "./types/city.ts"

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


async function getCityById(city_id: number): Promise<City | null> {
    const result = await pool.query(
        `
        SELECT city_id, city, country_id
        FROM city
        WHERE city_id = $1
        `,
        [city_id]
    );

    return result.rows[0] ?? null;
}

export default {
    getAll: getAllCities,
    getById: getCityById
}