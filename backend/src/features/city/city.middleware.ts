import type { Request, Response, NextFunction } from "express"
import { CityNotFound } from "./city.error.ts"

export const CityErrorHandler = (error: Error, _: Request, res: Response, next: NextFunction) => {
    if (error instanceof CityNotFound) {
        return res.status(404).json({error: error.message})
    }

     next(error)
}