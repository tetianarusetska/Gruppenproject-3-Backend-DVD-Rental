import type { Request, Response, NextFunction } from "express"
import {  CustomerNotFound, CustomerHasRelatedRecords } from "./customer.error.ts"

export const customersErrorHandler = (error: Error, _: Request, res: Response, next: NextFunction) => {

    if (error instanceof CustomerNotFound) {
        return res.status(404).json({ error: error.message })
    }

    if (error instanceof CustomerHasRelatedRecords) {
        return res.status(409).json({ error: error.message })
    }

    next(error)
}