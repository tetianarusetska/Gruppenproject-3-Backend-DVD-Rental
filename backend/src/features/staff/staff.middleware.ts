import type { Request, Response, NextFunction } from "express"
import {  StaffNotFound } from "./staff.error.ts"

export const StaffErrorHandler = (error: Error, _: Request, res: Response, next: NextFunction) => {

    if (error instanceof StaffNotFound) {
        return res.status(404).json({ error: error.message })
    }

    next(error); 
}