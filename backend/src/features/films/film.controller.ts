import { type Request, type Response } from "express"
import filmServices from "./film.services.ts";

const findAllFilms = async (reg: Request, res: Response) => {
    const films = await filmServices.findAll()

    res.json(films)
}

export default {
    findAll: findAllFilms
}