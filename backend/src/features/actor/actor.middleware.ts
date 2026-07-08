import type { NextFunction, Request, Response } from "express";
import { ActorNotFound } from "./actor.error.ts";

export const actorErorHandler = (error: Error, _: Request, res: Response, next: NextFunction) => {
    if (error instanceof ActorNotFound) {
        return res.status(404).json({error: error.message})
    }
}