import type { Film } from "./types/film.ts";
import filmRepo from "./film.repo.ts";

const findAllFilms = async (): Promise<Film[]> => {
    return await filmRepo.findAll()
}

export default {
    findAll: findAllFilms
}