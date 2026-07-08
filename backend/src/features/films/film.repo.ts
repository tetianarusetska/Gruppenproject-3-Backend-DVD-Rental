import { getPostgresPool } from "../../db/postgres.pool.ts";
import type { Film, FilmList } from "./types/film.ts";

const pool = getPostgresPool();

const findFilm = async (id: number): Promise<Film | null> => {
    const result = await pool.query<Film>(
        `
        SELECT 
            f.film_id, 
            f.title, 
            f.description, 
            f.release_year, 
            f.rental_duration, 
            f.rental_rate, 
            f.length, 
            f.replacement_cost, 
            f.rating, 
            f.special_features,
            
            -- 1. Sprache als eingebettetes Einzelobjekt bauen (TRIM entfernt Leerzeichen von CHAR(20))
            CASE 
                WHEN l.language_id IS NOT NULL THEN 
                    json_build_object('language_id', l.language_id, 'name', TRIM(l.name))
                ELSE NULL 
            END AS language,

            -- 2. Alle Kategorien über eine Subquery als JSON-Array aggregieren
            COALESCE(
                (SELECT json_agg(json_build_object('category_id', c.category_id, 'name', c.name))
                 FROM public.film_category fc
                 JOIN public.category c ON fc.category_id = c.category_id
                 WHERE fc.film_id = f.film_id),
                '[]'::json
            ) AS categories,

            -- 3. Alle Schauspieler über eine Subquery als JSON-Array aggregieren
            COALESCE(
                (SELECT json_agg(json_build_object('actor_id', a.actor_id, 'first_name', a.first_name, 'last_name', a.last_name))
                 FROM public.film_actor fa
                 JOIN public.actor a ON fa.actor_id = a.actor_id
                 WHERE fa.film_id = f.film_id),
                '[]'::json
            ) AS actors

        FROM public.film f
        LEFT JOIN public.language l ON f.language_id = l.language_id
        WHERE f.film_id = $1
        `,
        [id]
    )

    return result.rows[0] ?? null
}

const findAllFilms = async (): Promise<FilmList[]> => {
    const result = await pool.query<FilmList>(
        `
        SELECT f.film_id, f.title, f.description, f.release_year, f.length, f.rating,
        l.name AS language_name,
        string_agg(DISTINCT c.name, ', ') AS categories,
        string_agg(DISTINCT a.first_name || ' ' || a.last_name, ', ') AS actors

        FROM film f

        LEFT JOIN public.language l ON f.language_id = l.language_id

        LEFT JOIN public.film_category fc ON f.film_id = fc.film_id
        LEFT JOIN public.category c ON fc.category_id = c.category_id

        LEFT JOIN public.film_actor fa ON f.film_id = fa.film_id
        LEFT JOIN public.actor a ON fa.actor_id = a.actor_id

        GROUP BY f.film_id, f.title, f.description, l.name
        ORDER BY f.film_id;
        `
    )

    return result.rows
}

export default {
    find: findFilm,
    findAll: findAllFilms
}