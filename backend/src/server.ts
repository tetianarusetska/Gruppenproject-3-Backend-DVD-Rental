import express from "express"
import cookieParser from "cookie-parser"
import morgan from "morgan"

const port = 3000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))


app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})