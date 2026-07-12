import { getPostgresPool } from "../../db/postgres.pool.ts"
import type { CreateStore } from "./types/createStore.ts";
import type { StoreWithDetails } from "./types/storeWithDetails.ts";

const pool = getPostgresPool();


const STORE_QUERY = `
    SELECT st.store_id, st.manager_staff_id, st.address_id,
           m.first_name AS manager_first_name, m.last_name AS manager_last_name,
           a.address, a.district, ci.city, co.country
    FROM store st
    JOIN staff m ON st.manager_staff_id = m.staff_id
    JOIN address a ON st.address_id = a.address_id
    JOIN city ci ON a.city_id = ci.city_id
    JOIN country co ON ci.country_id = co.country_id
`;

const getAllStores = async (): Promise<StoreWithDetails[]> => {
    const result = await pool.query(⁠ ${STORE_QUERY} ORDER BY st.store_id ⁠); 
    return result.rows;
};

const getStoreById = async (store_id: number): Promise<StoreWithDetails | null> => {
    const result = await pool.query(⁠ ${STORE_QUERY} WHERE st.store_id = $1 ⁠, [store_id]);
    return result.rows[0] ?? null;
};

const createStore = async (data: CreateStore): Promise<number> => {
    const result = await pool.query(
        `INSERT INTO store (manager_staff_id, address_id, last_update)
         VALUES ($1, $2, now())
         RETURNING store_id`,
        [data.manager_staff_id, data.address_id]
    );

    return result.rows[0].store_id;
};

export default { 
    getAll: getAllStores, 
    getById: getStoreById, 
    create: createStore};