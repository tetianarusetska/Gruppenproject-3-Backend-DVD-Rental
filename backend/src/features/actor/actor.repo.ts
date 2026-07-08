import { getPostgresPool } from "../../db/postgres.pool.ts";
import type { Actor } from "./types/actor.ts";

const pool = getPostgresPool()

const findActor = async (id: number): Promise<Actor | null> => {
    const result = await pool.query<Actor>(
        `
        SELECT actor_id, first_name, last_name 
        FROM public.actor
        WHERE actor_id = $1
        `,
        [id]
    )

    return result.rows[0] ?? null
}

const findAllActors = async (): Promise<Actor[]> => {
    const result = await pool.query<Actor>(
        `
        SELECT actor_id, first_name, last_name 
        FROM public.actor
        `
    )

    return result.rows
}

export default {
    find: findActor,
    findAll: findAllActors
}