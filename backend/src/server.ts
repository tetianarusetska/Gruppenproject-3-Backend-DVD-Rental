import express from "express"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import { getHealth } from "./health.ts"
import cors from "cors"

import authRouter from "./features/auth/auth.router.ts"

// films
import filmRouter from "./features/films/film.routes.ts"
import actorRouter from "./features/actor/actor.router.ts"
import categoryRouter from "./features/category/category.router.ts"
import languageRouter from "./features/language/language.router.ts"

// customers
import customerRouter from "./features/clients/customers/customer.routes.ts"
import cityRouter from "./features/clients/cities/city.routes.ts"
import countryRouter from "./features/clients/countries/country.routes.ts"
import addressRouter from "./features/clients/addresses/address.routes.ts"

// rentals
import rentalRouter from "./features/rental/rental.router.ts"

import { customersErrorHandler } from "./features/clients/customers/customer.middleware.ts"
import { getPostgresPool } from "./db/postgres.pool.ts"

const port = 3000
const app = express()

const pool = getPostgresPool()

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(cors())

app.get("/health", getHealth)

app.use("/auth", authRouter)

//films
app.use("/films", filmRouter)
app.use("/actors", actorRouter)
app.use("/categories", categoryRouter)
app.use("/languages", languageRouter)

//customers
app.use("/customers", customerRouter)
app.use("/cities", cityRouter)
app.use("/countries", countryRouter)
app.use("/addresses", addressRouter)

//rentals
app.use("/rentals", rentalRouter)

app.use(customersErrorHandler);

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})