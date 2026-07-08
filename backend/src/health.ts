import type { Request, Response } from "express"
import { getPostgresPool } from "./db/postgres.pool.ts"

const pool = getPostgresPool()

export const getHealth = async (_: Request, res: Response) => {
    await pool.query("SELECT 1")
    return res.json({
        status: "ok",
        timestamp: new Date().toISOString()
    })
}