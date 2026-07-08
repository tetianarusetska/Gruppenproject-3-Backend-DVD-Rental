import express from "express"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import { getHealth } from "./health.ts"

import filmRouter from "./features/films/film.routes.ts"
import customerRouter from "./features/clients/customers/customer.routes.ts"
import cityRouter from "./features/clients/cities/city.routes.ts"
import countryRouter from "./features/clients/countries/country.routes.ts"
import addressRouter from "./features/clients/addresses/address.routes.ts"
import { customersErrorHandler } from "./features/clients/customers/customer.middleware.ts"

const port = 3000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

app.get("/health", getHealth)

//films
app.use("/films", filmRouter)
//customers
app.use("/customers", customerRouter)
app.use("/cities", cityRouter)
app.use("/countries", countryRouter)
app.use("/addresses", addressRouter)
app.use(customersErrorHandler);


app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})