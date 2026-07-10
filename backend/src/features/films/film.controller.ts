import { type Request, type Response } from "express"
import filmServices from "./film.services.ts";

const findFilm = async (req: Request<{ id: string }>, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid movie ID provided" });
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

const createFilm = async (req: Request, res: Response) => {
    const createdFilm = await filmServices.create(req.body)

    return res.status(201).json(createdFilm)
}

const updateFilm = async (req: Request, res: Response) => {
    const filmId = Number(req.params.id)
    if (isNaN(filmId)) {
        return res.status(400).json({ error: "Invalid movie ID provided." })
    }

    const updatedFilm = await filmServices.update(filmId, req.body)
    return res.status(200).json(updatedFilm)
}

const deleteFilm = async (req: Request, res: Response) => {
    try {
        const filmId = Number(req.params.id);
        if (isNaN(filmId)) {
            return res.status(400).json({
                error: "Invalid movie ID provided."
            });
        }
        await filmServices.delete(filmId);
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({
            error: "Film konnte nicht gelöscht werden."
        });
    }
}

export default {
    find: findFilm,
    findAll: findAllFilms,
    findAvailability: findFilmAvailability,
    create: createFilm,
    update: updateFilm,
    delete: deleteFilm
}