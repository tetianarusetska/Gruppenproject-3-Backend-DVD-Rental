import type { NextFunction, Request, Response } from "express";
import { CategoryNotFound } from "./category.error.ts";

export const categoryErrorHandler = (error: Error, _: Request, res: Response, next: NextFunction) => {
    if (error instanceof CategoryNotFound) {
        return res.status(404).json({error: error.message})
    }
}