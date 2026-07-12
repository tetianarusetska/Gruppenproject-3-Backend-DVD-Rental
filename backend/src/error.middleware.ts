import type { Request, Response, NextFunction } from "express"

export const errorFallback = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.log(error.stack)
    return res.status(500).json({ error: "An unknown error occurred." })
}