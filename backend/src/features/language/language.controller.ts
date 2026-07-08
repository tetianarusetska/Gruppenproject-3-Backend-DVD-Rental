import type { Request, Response } from "express";
import languageServices from "./language.services.ts";

const findLanguage = async (req: Request<{id: number}>, res: Response) => {
    const { id } = req.params

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