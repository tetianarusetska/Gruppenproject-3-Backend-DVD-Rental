import { getPostgresPool } from "../../db/postgres.pool.ts";
import type { Film } from "./types/film.ts";

const pool = getPostgresPool();

const findAllFilms = async (): Promise<Film[]> => {
    const result = await pool.query<Film>(
        `
        SELECT film_id, title, description
        from film
        `
    )

    return result.rows
}

export default {
    findAll: findAllFilms
}