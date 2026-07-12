import type { Request, Response, NextFunction } from "express"
import {  StoreNotFound } from "./store.error.ts"

export const StoreErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof StoreNotFound) {
        return res.status(404).json({ error: error.message });
    }

    next(error); 
}