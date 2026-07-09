import { getPostgresPool } from "../../db/postgres.pool.ts";
import type { User } from "./types/user.ts";

const pool = getPostgresPool()

const loginAuth = async (username: string): Promise<User | null> => {
    const result = await pool.query<User>(
        `
        SELECT username, password 
        FROM public.staff
        WHERE username = $1
        `,
        [username]
    )

    return result.rows[0] ?? null
}

export default {
    login: loginAuth
}