import express from "express"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import { getHealth } from "./health.ts"

import filmRouter from "./features/films/film.routes.ts"
import actorRouter from "./features/actor/actor.router.ts"
import customerRouter from "./features/clients/customers/customer.routes.ts"
import cityRouter from "./features/clients/cities/city.routes.ts"
import countryRouter from "./features/clients/countries/country.routes.ts"
import addressRouter from "./features/clients/addresses/address.routes.ts"
import { customersErrorHandler } from "./features/clients/customers/customer.middleware.ts"
import { getPostgresPool } from "./db/postgres.pool.ts"


const port = 3000
const app = express()

const pool = getPostgresPool()

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

app.get("/health", getHealth)

//films
app.use("/films", filmRouter)
app.use("/actors", actorRouter)
//customers
app.use("/customers", customerRouter)
app.use("/cities", cityRouter)
app.use("/countries", countryRouter)
app.use("/addresses", addressRouter)
app.use(customersErrorHandler);

app.get("/rentals", async (req, res) => {
  try {
   const result = await pool.query(`
  SELECT
    r.rental_id,
    r.rental_date,
    r.return_date,
    c.first_name AS customer_first_name,
    c.last_name AS customer_last_name,
    f.title AS film_title
  FROM public.rental r
  JOIN public.customer c
    ON r.customer_id = c.customer_id
  JOIN public.inventory i
    ON r.inventory_id = i.inventory_id
  JOIN public.film f
    ON i.film_id = f.film_id
  ORDER BY r.rental_date DESC
  LIMIT 50;
`) ;

    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).send("Fehler beim Laden der Rentals");
  }
});
app.get("/rentals/active", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        r.rental_id,
        r.rental_date,
        r.return_date,
        c.first_name AS customer_first_name,
        c.last_name AS customer_last_name,
        f.title AS film_title
      FROM public.rental r
      JOIN public.customer c
        ON r.customer_id = c.customer_id
      JOIN public.inventory i
        ON r.inventory_id = i.inventory_id
      JOIN public.film f
        ON i.film_id = f.film_id
      WHERE r.return_date IS NULL
      ORDER BY r.rental_date DESC
      LIMIT 50;
    `)

    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).send("Fehler beim Laden der aktiven Rentals")
  }
})
app.get("/rentals/search", async (req, res) => {
  try {
    const name = req.query.name

    const result = await pool.query(`
      SELECT
        r.rental_id,
        r.rental_date,
        r.return_date,
        c.first_name AS customer_first_name,
        c.last_name AS customer_last_name,
        f.title AS film_title
      FROM public.rental r
      JOIN public.customer c
        ON r.customer_id = c.customer_id
      JOIN public.inventory i
        ON r.inventory_id = i.inventory_id
      JOIN public.film f
        ON i.film_id = f.film_id
      WHERE c.first_name ILIKE $1
         OR c.last_name ILIKE $1
      ORDER BY r.rental_date DESC
      LIMIT 50;
    `, [`%${name}%`])

    res.json(result.rows)
  } catch (error) {
    console.error(error)
    res.status(500).send("Fehler bei der Rental-Suche")
  }
})
app.get("/rentals/:id", async (req, res) => {
  try {
    const rentalId = req.params.id

    const result = await pool.query(`
      SELECT
        r.rental_id,
        r.rental_date,
        r.return_date,
        c.first_name AS customer_first_name,
        c.last_name AS customer_last_name,
        f.title AS film_title
      FROM public.rental r
      JOIN public.customer c
        ON r.customer_id = c.customer_id
      JOIN public.inventory i
        ON r.inventory_id = i.inventory_id
      JOIN public.film f
        ON i.film_id = f.film_id
      WHERE r.rental_id = $1;
    `, [rentalId])

    res.json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).send("Fehler beim Laden der Rental-ID")
  }
})

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})