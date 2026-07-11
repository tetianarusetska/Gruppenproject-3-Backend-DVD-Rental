import type { Request, Response, NextFunction } from "express"
import { AddressNotFound } from "./address.error.ts"

export const AddressErrorHandler = (error: Error, _: Request, res: Response, next: NextFunction) => {
    if (error instanceof AddressNotFound) {
        return res.status(404).json({error: error.message})
    }
}