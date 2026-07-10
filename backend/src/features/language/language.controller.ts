import type { Request, Response } from "express";
import languageServices from "./language.services.ts";

const findLanguage = async (req: Request<{id: string}>, res: Response) => {
    const id = Number(req.params.id)

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid language ID provided" });
    }

    const language = await languageServices.find(id)

    res.json(language)
}

const findAllLanguage = async (_: Request, res: Response) => {
    const language = await languageServices.findAll()

    res.json(language)
}

export default {
    find: findLanguage,
    findAll: findAllLanguage
}