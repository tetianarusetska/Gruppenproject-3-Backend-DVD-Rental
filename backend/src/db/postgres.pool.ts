// import { loadEnvFile } from "node:process"
import "dotenv/config"
import { Pool } from "pg"

// loadEnvFile(".env.example")

let pool: Pool | null = null // Singelton

export function getPostgresPool(): Pool {
    if (!pool) {
        pool = process.env.DATABASE_URL
            ? new Pool({
                connectionString: process.env.DATABASE_URL,
                ssl: { rejectUnauthorized: false },
                max: 1,
                idleTimeoutMillis: 30_000,
                connectionTimeoutMillis: 5_000
            })
            : new Pool({
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRES_PORT),
                user: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                max: 1,
                idleTimeoutMillis: 30_000,
                connectionTimeoutMillis: 5_000
            })

        pool.on("error", (err) => {
            console.error("Unexpected PG pool error", err)
        })
    }

    return pool
}
