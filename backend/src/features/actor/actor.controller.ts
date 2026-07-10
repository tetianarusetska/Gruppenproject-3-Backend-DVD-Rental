import type { Request, Response } from "express";
import actorServices from "./actor.services.ts";

const findActor = async (req: Request<{ id: string}>, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid actor ID provided" });
    }

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