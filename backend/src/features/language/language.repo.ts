import { getPostgresPool } from "../../db/postgres.pool.ts";
import type { Language } from "./types/language.ts";

const pool = getPostgresPool()

const findLanguage = async (id: number): Promise<Language | null> => {
    const result = await pool.query<Language> (
        `
        SELECT language_id, name
        FROM public.language
        WHERE language_id = $1
        `,
        [id]
    )

    return result.rows[0] ?? null
}

const findAllLanguage = async (): Promise<Language[]> => {
    const result = await pool.query<Language>(
        `
        SELECT language_id, name
        FROM public.language
        `
    )

    return result.rows
}

export default {
    find: findLanguage,
    findAll: findAllLanguage
}