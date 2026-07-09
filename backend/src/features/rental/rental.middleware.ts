import type { NextFunction, Request, Response } from "express";
import { RentalNotFound } from "./rental.error.ts";

export const rentalErrorHandler = (error: Error, _: Request, res: Response, next: NextFunction) => {
    if (error instanceof RentalNotFound) {
        return res.status(404).json({error: error.message})
    }
}