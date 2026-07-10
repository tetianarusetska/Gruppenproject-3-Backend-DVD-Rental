import { getPostgresPool } from "../../db/postgres.pool.ts";
import type { Film, FilmList, FilmAvailability, CreateFilmInput } from "./types/film.ts";

const pool = getPostgresPool()

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

const findFilmAvailability = async (title: string): Promise<FilmAvailability[]> => {
    const result = await pool.query<FilmAvailability>(
        `
    SELECT
      f.film_id,
      f.title,
      i.store_id,
      COUNT(i.inventory_id)::int AS total_copies,
      COUNT(i.inventory_id) FILTER (
        WHERE r.rental_id IS NULL
      )::int AS available_copies
    FROM public.film f
    JOIN public.inventory i
      ON f.film_id = i.film_id
    LEFT JOIN public.rental r
      ON i.inventory_id = r.inventory_id
      AND r.return_date IS NULL
    WHERE f.title ILIKE $1
    GROUP BY f.film_id, f.title, i.store_id
    ORDER BY f.title ASC, i.store_id ASC;
    `,
        [`%${title}%`]
    )

    return result.rows
}

const createFilm = async (input: CreateFilmInput): Promise<number> => {
    const client = await pool.connect()
    let filmId
    try {
        await client.query("BEGIN")

        const result = await client.query(
            `
            INSERT INTO public.film (
                title, description, release_year, language_id, 
                rental_duration, rental_rate, length, replacement_cost, 
                rating, special_features, fulltext
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, to_tsvector('english', $1 || ' ' || COALESCE($2, '')))
            RETURNING film_id
            `,
            [
                input.title,
                input.description,
                input.release_year,
                input.language.language_id,
                input.rental_duration,
                input.rental_rate,
                input.length,
                input.replacement_cost,
                input.rating,
                input.special_features
            ]
        );

        filmId = result.rows[0].film_id

        if (input.categories && input.categories.length > 0) {
            for (const cat of input.categories) {
                await client.query(
                    `
                    INSERT INTO public.film_category (film_id, category_id)
                    VALUES ($1, $2)
                    `,
                    [filmId, cat.category_id]
                );
            }
        }

        if (input.actors && input.actors.length > 0) {
            for (const actor of input.actors) {
                await client.query(
                    `
                    INSERT INTO public.film_actor (actor_id, film_id)
                    VALUES ($1, $2)
                    `,
                    [actor.actor_id, filmId]
                );
            }
        }

        await client.query("COMMIT")
    } catch (error) {
        await client.query("ROLLBACK")
        throw error
    } finally {
        client.release()
    }

    return filmId
};

const updateFilm = async (filmId: number, input: CreateFilmInput) => {
    const client = await pool.connect();
    try {
        await client.query("BEGIN")

        const updateFilmQuery =
            `
        UPDATE public.film 
            SET 
                title = $1, 
                description = $2, 
                release_year = $3, 
                language_id = $4, 
                rental_duration = $5, 
                rental_rate = $6, 
                length = $7, 
                replacement_cost = $8, 
                rating = $9, 
                special_features = $10,
                last_update = now(),
                fulltext = to_tsvector('english', $1 || ' ' || COALESCE($2, ''))
            WHERE film_id = $11
        `

        await client.query(updateFilmQuery, [
            input.title,
            input.description,
            input.release_year,
            input.language.language_id,
            input.rental_duration,
            input.rental_rate,
            input.length,
            input.replacement_cost,
            input.rating,
            input.special_features,
            filmId
        ])

        await client.query("DELETE FROM public.film_category WHERE film_id = $1", [filmId])
        if (input.categories && input.categories.length > 0) {
            for (const cat of input.categories) {
                await client.query(
                    `
                    INSERT INTO public.film_category (category_id, film_id, last_update)
                    VALUES ($1, $2, now())
                    `,
                    [cat.category_id, filmId]
                )
            }
        }

        await client.query("DELETE FROM public.film_actor WHERE film_id = $1", [filmId])
        if (input.actors && input.actors.length > 0) {
            for (const actor of input.actors) {
                await client.query(
                    `
                    INSERT INTO public.film_actor (actor_id, film_id, last_update)
                    VALUES ($1, $2, now())
                    `,
                    [actor.actor_id, filmId]
                )
            }
        }

        await client.query("COMMIT")
    }
    catch (error) {
        await client.query("ROLLBACK")
        throw error
    } finally {
        client.release()
    }
}

const deleteFilm = async (filmId: number): Promise<boolean> => {
    const client = await pool.connect()
    try {
        await client.query("BEGIN")

        const activeRentalsResult = await client.query(
            `
            SELECT COUNT(*) as count 
            FROM public.rental 
            WHERE inventory_id IN (
                SELECT inventory_id FROM public.inventory WHERE film_id = $1
            ) AND return_date IS NULL
            `,
            [filmId]
        );

        if (activeRentalsResult.rows[0].count > 0) {
            throw new Error("ACTIVE_RENTALS_EXIST");
        }

        await client.query("DELETE FROM public.film_category WHERE film_id = $1", [filmId])
        await client.query("DELETE FROM public.film_actor WHERE film_id = $1", [filmId])

        await client.query(
            `
            DELETE FROM public.rental 
            WHERE inventory_id IN (
                SELECT inventory_id FROM public.inventory WHERE film_id = $1
            )
            `,
            [filmId]
        )

        await client.query("DELETE FROM public.inventory WHERE film_id = $1", [filmId])

        const result = await client.query("DELETE FROM public.film WHERE film_id = $1", [filmId])

        await client.query("COMMIT")

        return result.rowCount ? result.rowCount > 0 : false
    } catch (error) {
        await client.query("ROLLBACK")
        throw error
    } finally {
        client.release()
    }
}

const getStatistics = async () => {
    const result = await pool.query(
        `
        SELECT
        (
            SELECT COUNT(*)::int
            FROM public.film
        ) AS "totalFilms",
        (
            SELECT COUNT(*)::int
            FROM public.inventory
        ) AS "totalCopies",
        (
            SELECT COUNT(*)::int
            FROM public.inventory i
            LEFT JOIN public.rental r
                ON i.inventory_id = r.inventory_id
                AND r.return_date IS NULL
            WHERE r.rental_id IS NULL
        ) AS "availableCopies",
        (
            SELECT ROUND(AVG(length))::int
            FROM public.film
        ) AS "avgLength",
        (
            SELECT ROUND(AVG(rental_rate)::numeric,2)
            FROM public.film
        ) AS "avgRentalRate",
        (
            SELECT rating
            FROM public.film
            GROUP BY rating
            ORDER BY COUNT(*) DESC
            LIMIT 1
        ) AS "topRating",
        -- TOP RENTED FILMS
        (
            SELECT json_agg(t)
            FROM (
                SELECT
                    f.title,
                    COUNT(r.rental_id)::int AS rentals
                FROM public.film f
                JOIN public.inventory i
                    ON f.film_id = i.film_id
                JOIN public.rental r
                    ON i.inventory_id = r.inventory_id
                GROUP BY f.film_id
                ORDER BY rentals DESC
                LIMIT 10
            ) t
        ) AS "topFilms",
        -- RATINGS
        (
            SELECT json_agg(t)
            FROM (
                SELECT
                    rating,
                    COUNT(*)::int AS count
                FROM public.film
                GROUP BY rating
                ORDER BY count DESC
            ) t
        ) AS "ratings",
        -- RENTALS BY MONTH
        (
            SELECT json_agg(t)
            FROM (
                SELECT
                    TO_CHAR(
                        DATE_TRUNC(
                            'month',
                            rental_date
                        ),
                        'YYYY-MM'
                    ) AS month,
                    COUNT(*)::int AS count
                FROM public.rental
                GROUP BY
                    DATE_TRUNC(
                        'month',
                        rental_date
                    )
                ORDER BY month
            ) t
        ) AS "rentalsByMonth"
        `
    );
    return result.rows[0];
};



export default {
    find: findFilm,
    findAll: findAllFilms,
    findAvailability: findFilmAvailability,
    getStatistics,
    create: createFilm,
    update: updateFilm,
    delete: deleteFilm
}