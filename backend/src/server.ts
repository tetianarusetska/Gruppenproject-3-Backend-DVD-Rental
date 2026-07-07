import express from "express"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import { getHealth } from "./health.ts"

import filmRouter from "./features/films/film.routes.ts"
import customersRouter from "./features/clients/customers/customers.routes.ts"
import citiesRouter from "./features/clients/cities/cities.routes.ts"
import countriesRouter from "./features/clients/countries/countries.routes.ts"
import addressesRouter from "./features/clients/addresses/addresses.routes.ts"
import { customersErrorHandler } from "./features/clients/customers/customers.middleware.ts"

const port = 3000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

app.get("/health", getHealth)

//films
app.use("/films", filmRouter)
//customers
app.use("/customers", customersRouter)
app.use("/cities", citiesRouter)
app.use("/countries", countriesRouter)
app.use("/addresses", addressesRouter)
app.use(customersErrorHandler);


app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})