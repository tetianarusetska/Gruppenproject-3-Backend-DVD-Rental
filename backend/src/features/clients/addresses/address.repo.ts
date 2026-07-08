import { getPostgresPool } from "../../../db/postgres.pool.ts"
import { type Address } from "../types/address.ts"
import type { CreateAddressInput } from "../types/createAddressInput.ts";

const pool = getPostgresPool();

const createAddress = async (address: CreateAddressInput): Promise<Address> => {

    const result = await pool.query(
        `
        INSERT INTO address
        (
            address,
            city_id,
            postal_code,
            district,
            phone
        )
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *
        `,
        [
            address.address,
            address.city_id,
            address.postal_code,
            address.district,
            address.phone
        ]
    );

    return result.rows[0];
};

const getAllAddresses = async (): Promise<Address[]> => {
    const result = await pool.query<Address>(
        `
        SELECT address_id, city_id, phone, address, district, postal_code
        FROM address
        `
    )
    return result.rows
}

export default {
    getAll: getAllAddresses,
    create: createAddress
}