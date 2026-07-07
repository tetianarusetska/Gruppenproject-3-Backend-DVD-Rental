import { getPostgresPool } from "../../../db/postgres.pool.ts"
import { type Address } from "../types/address.ts"

const pool = getPostgresPool();

const getAllAddresses = async (): Promise<Address[]> => {
    const result = await pool.query<Address>(
        `
        SELECT address_id, city_id, phone, address, district
        FROM address
        `
    )
    return result.rows
}

export default {
    getAll: getAllAddresses
}