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

const port = 3000
const app = express()


const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"];

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

// app.use((req, res, next) => {
//   // Erlaube explizit dein Frontend
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   // Erlaube das Mitsenden von Cookies (credentials)
//   res.header("Access-Control-Allow-Credentials", "true");
//   // Erlaube die gängigen HTTP-Methoden
//   res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   // Erlaube notwendige Header-Typen
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

//   // Falls es ein OPTIONS-Preflight-Request vom Browser ist, direkt mit 200 beantworten
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }

//   next();
// });

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

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