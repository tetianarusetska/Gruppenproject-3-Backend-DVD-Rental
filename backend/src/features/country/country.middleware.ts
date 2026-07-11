import type { Request, Response, NextFunction } from "express"
import {  CountryNotFound } from "./country.error.ts"

export const countryErrorHandler = (error: Error, _: Request, res: Response, next: NextFunction) => {

    if (error instanceof CountryNotFound) {
        return res.status(404).json({ error: error.message })
    }

    next(error)
}