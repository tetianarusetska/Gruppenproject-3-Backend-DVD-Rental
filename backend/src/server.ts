import express from "express"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import { getHealth } from "./health.ts"
import filmRouter from "./features/films/film.routes.ts"

const port = 3000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

app.get("/health", getHealth)

app.use("/films", filmRouter)

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})