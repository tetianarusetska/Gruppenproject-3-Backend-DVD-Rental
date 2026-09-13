import express from "express"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import { getHealth } from "./health.ts"

// auth
import authRouter from "./features/auth/auth.router.ts"

// films
import filmRouter from "./features/films/film.routes.ts"
import actorRouter from "./features/actor/actor.router.ts"
import categoryRouter from "./features/category/category.router.ts"
import languageRouter from "./features/language/language.router.ts"

// customers
import customerRouter from "./features/customer/customer.routes.ts"
import cityRouter from "./features/city/city.routes.ts"
import countryRouter from "./features/country/country.routes.ts"
import addressRouter from "./features/address/address.routes.ts"

// rentals
import rentalRouter from "./features/rental/rental.router.ts"

// staff, inventory, store
import staffRouter from "./features/staff/staff.routes.ts"
import storeRouter from "./features/store/store.routes.ts"
import inventoryRouter from "./features/inventory/inventory.routes.ts"

import { customersErrorHandler } from "./features/customer/customer.middleware.ts"
import { errorFallback } from "./error.middleware.ts"

const port = 3000
const app = express()


const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"];

// CORS
app.use((req, res, next) => {
  const origin = req.headers.origin;
  // Erlaube explizit dein Frontend
  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  // Erlaube das Mitsenden von Cookies (credentials)
  res.header("Access-Control-Allow-Credentials", "true");
  // Erlaube die gängigen HTTP-Methoden
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  // Erlaube notwendige Header-Typen
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  // Falls es ein OPTIONS-Preflight-Request vom Browser ist, direkt mit 200 beantworten
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});


app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

app.get("/health", getHealth)

app.use("/api/auth", authRouter)

//films
app.use("/api/films", filmRouter)
app.use("/api/actors", actorRouter)
app.use("/api/categories", categoryRouter)
app.use("/api/languages", languageRouter)

//customers
app.use("/api/customers", customerRouter)
app.use("/api/cities", cityRouter)
app.use("/api/countries", countryRouter)
app.use("/api/addresses", addressRouter)

//rentals
app.use("/api/rentals", rentalRouter)

// staff, store, inventory
app.use("/api/staff", staffRouter)
app.use("/api/store", storeRouter)
app.use("/api/inventory", inventoryRouter)

app.use(customersErrorHandler)
app.use(errorFallback)

export default app

if (process.env.NODE_ENV !== "production") {
  const port = Number(process.env.PORT) || 3000

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
}


