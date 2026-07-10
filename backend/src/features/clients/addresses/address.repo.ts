import { getPostgresPool } from "../../../db/postgres.pool.ts"
import { type Address } from "../types/address.ts"
import type { CreateAddressInput } from "../types/createAddressInput.ts";
import type { UpdateAddressInput } from "../types/updateAddressInput.ts";

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

const updateAddress = async (address: UpdateAddressInput): Promise<Address> => {
    const result = await pool.query(
        `
        UPDATE address
        SET
            address = $1,
            city_id = $2,
            postal_code = $3,
            district = $4,
            phone = $5
        WHERE address_id = $6
        RETURNING *
        `,
        [
            address.address,
            address.city_id,
            address.postal_code,
            address.district,
            address.phone,
            address.address_id
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
    create: createAddress,
    update: updateAddress
}