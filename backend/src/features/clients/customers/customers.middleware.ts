import type { Request, Response, NextFunction } from "express"
import {  CustomerNotFound } from "./customers.errors.ts"

export const customersErrorHandler = (error: Error, _: Request, res: Response, next: NextFunction) => {

    if (error instanceof CustomerNotFound) {
        return res.status(404).json({ error: error.message })
    }

    next(error)
}