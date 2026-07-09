import type { Film, FilmList, FilmAvailability } from "./types/film.ts";
import { FilmNotFound } from "./film.error.ts";
import filmRepo from "./film.repo.ts";

const findFilm = async (id: number): Promise<Film> => {
    const film = await filmRepo.find(id)

    if (!film) {
        throw new FilmNotFound(id)
    }

    return film
}

const findAllFilms = async (): Promise<FilmList[]> => {
    return await filmRepo.findAll()
}
const findFilmAvailability = async (
  title: string
): Promise<FilmAvailability[]> => {
  return await filmRepo.findAvailability(title)
}

export default {
    find: findFilm,
    findAll: findAllFilms,
    findAvailability: findFilmAvailability
}