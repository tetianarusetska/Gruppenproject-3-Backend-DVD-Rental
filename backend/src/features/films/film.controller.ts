import { type Request, type Response } from "express"
import filmServices from "./film.services.ts";

const findFilm = async (req: Request<{ id: string }>, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Ungültige Film-ID übergeben" });
    }

    const film = await filmServices.find(id)

    res.json(film)
}

const findAllFilms = async (_: Request, res: Response) => {
    const films = await filmServices.findAll()

    res.json(films)
}

const findFilmAvailability = async (_req: Request, res: Response) => {
  const title = String(_req.query.title ?? "")

  const films = await filmServices.findAvailability(title)

  res.json(films)
}

export default {
    find: findFilm,
    findAll: findAllFilms,
    findAvailability: findFilmAvailability
}