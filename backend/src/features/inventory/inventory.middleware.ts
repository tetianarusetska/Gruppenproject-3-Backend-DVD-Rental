import type { Request, Response, NextFunction } from "express"
import { InventoryNotFound } from "./inventory.error.ts"

export const InventoryErrorHandler = (error: Error, _: Request, res: Response, next: NextFunction) => {

    if (error instanceof InventoryNotFound) {
        return res.status(404).json({ error: error.message })
    }

    next(error)
}