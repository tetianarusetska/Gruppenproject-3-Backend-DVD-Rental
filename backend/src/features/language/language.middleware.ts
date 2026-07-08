import type { Request, Response, NextFunction } from "express";
import { LanguageNotFound } from "./language.error.ts";

export const languageErrorHandler = (error: Error, _: Request, res: Response, next: NextFunction) => {
    if (error instanceof LanguageNotFound) {
        return res.status(404).json({error: error.message})
    }
}