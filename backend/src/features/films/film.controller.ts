import { type Request, type Response } from "express"
import filmServices from "./film.services.ts";

const findFilm = async (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params

    const film = await filmServices.find(id)

    res.json(film)
}

const findAllFilms = async (_: Request, res: Response) => {
    const films = await filmServices.findAll()

    res.json(films)
}

export default {
    find: findFilm,
    findAll: findAllFilms
}