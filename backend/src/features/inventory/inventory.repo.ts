import { getPostgresPool } from "../../db/postgres.pool.ts"
import type { CreateInventory } from "./types/createInventory.ts";
import type { InventoryWithDetails } from "./types/inventoryWithDetails.ts";

const pool = getPostgresPool();

const INVENTORY_QUERY = `
    SELECT i.inventory_id, i.film_id, i.store_id,
           f.title, f.rental_rate,
           a.address AS store_address, ci.city AS store_city, co.country AS store_country
    FROM inventory i
    JOIN film f ON i.film_id = f.film_id
    JOIN store st ON i.store_id = st.store_id
    JOIN address a ON st.address_id = a.address_id
    JOIN city ci ON a.city_id = ci.city_id
    JOIN country co ON ci.country_id = co.country_id
`;

const getAllInventory = async (): Promise<InventoryWithDetails[]> => {
    const result = await pool.query(⁠ ${INVENTORY_QUERY} ORDER BY i.inventory_id ⁠);
    return result.rows;
};

const getInventoryById = async (inventory_id: number): Promise<InventoryWithDetails | null> => {
    const result = await pool.query(⁠ ${INVENTORY_QUERY} WHERE i.inventory_id = $1 ⁠, [inventory_id]);
    return result.rows[0] ?? null;
};

const createInventory = async (data: CreateInventory): Promise<number> => {
    const result = await pool.query(
        `INSERT INTO inventory (film_id, store_id, last_update)
         VALUES ($1, $2, now())
         RETURNING inventory_id`,
        [data.film_id, data.store_id]
    );

    return result.rows[0].inventory_id;
};

export default {
    getAll: getAllInventory,
    getById: getInventoryById,
    create: createInventory
};