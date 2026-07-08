import type { Request, Response, NextFunction } from "express"
import { FilmNotFound } from "./film.error.ts"

export const filmErrorHandler = (error: Error, _: Request, res: Response, next: NextFunction) => {
    if (error instanceof FilmNotFound) {
        return res.status(404).json({error: error.message})
    }
}