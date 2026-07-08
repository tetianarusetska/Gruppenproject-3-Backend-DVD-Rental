import { getPostgresPool } from "../../db/postgres.pool.ts";
import type { Category } from "./types/category.ts";

const pool = getPostgresPool()

const findCategory = async (id: number): Promise<Category | null> => {
    const result = await pool.query<Category>(
        `
        SELECT category_id, name
        FROM public.category
        WHERE category_id = $1
        `,
        [id]
    )

    return result.rows[0] ?? null
}

const findAllCategories = async (): Promise<Category[]> => {
    const result = await pool.query<Category>(
        `
        SELECT category_id, name
        FROM public.category
        `
    )

    return result.rows
}

export default {
    find: findCategory,
    findAll: findAllCategories
}