import type { Request, Response } from "express";
import actorServices from "./actor.services.ts";

const findActor = async (req: Request<{ id: number}>, res: Response) => {
    const { id } = req.params

    const actor = await actorServices.find(id)

    res.json(actor)
}

const findAllAcotors = async (_: Request, res: Response) => {
    const actors = await actorServices.findAll()

    res.json(actors);
}

export default {
    find: findActor,
    findAll: findAllAcotors
}