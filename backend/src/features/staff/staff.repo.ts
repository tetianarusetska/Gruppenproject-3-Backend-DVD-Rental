import { getPostgresPool } from "../../db/postgres.pool.ts"
import type { CreateStaff } from "./types/createStaff.ts";
import type { StaffWithAddress } from "./types/staffWithAddress.ts";

const pool = getPostgresPool();

const STAFF_QUERY = `
        SELECT s.staff_id, s.first_name, s.last_name, s.email,
               s.store_id, s.active, s.username, s.last_update,
               a.address, a.district, ci.city, co.country
        FROM staff s
        JOIN address a ON s.address_id = a.address_id
        JOIN city ci ON a.city_id = ci.city_id
        JOIN country co ON ci.country_id = co.country_id
`;

const getAllStaff = async (): Promise<StaffWithAddress[]> => {

    const result = await pool.query(`${STAFF_QUERY} ORDER BY s.staff_id`);

    return result.rows;
};

const getStaffById = async (staff_id: number): Promise<StaffWithAddress | null> => {

    const result = await pool.query(`${STAFF_QUERY} WHERE s.staff_id = $1`, [staff_id]);

    return result.rows[0] ?? null;
};

const createStaff = async (data: CreateStaff & { password: string }): Promise<number> => {
    const result = await pool.query(
        `INSERT INTO staff (first_name, last_name, address_id, email, store_id, username, password, active, last_update)
         VALUES ($1, $2, $3, $4, $5, $6, $7, true, now())
         RETURNING staff_id`,
        [
            data.first_name,   
            data.last_name,   
            data.address_id,   
            data.email ?? null,
            data.store_id,     
            data.username,     
            data.password,
        ]
    );

    return result.rows[0].staff_id;
};



export default {
    getAll: getAllStaff,
    getById: getStaffById,
    create: createStaff
};