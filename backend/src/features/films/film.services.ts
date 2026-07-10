import type { Film, FilmList, FilmAvailability, CreateFilmInput } from "./types/film.ts";
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

const createFilm = async (input: CreateFilmInput): Promise<Film> => {
    const newFilmId = await filmRepo.create(input);
    
    const film = await filmRepo.find(newFilmId);
    if (!film) {
        throw new Error("A film was created but could not be uploaded.");
    }
    return film;
}

const updateFilm = async (filmId: number, input: CreateFilmInput): Promise<Film> => {
    const existingFilm = await filmRepo.find(filmId);
    if (!existingFilm) {
        throw new Error(`The film with ID ${filmId} was not found.`);
    }

    await filmRepo.update(filmId, input);
    
    const updatedFilm = await filmRepo.find(filmId);
    if (!updatedFilm) {
        throw new Error("Error loading the updated film.");
    }
    return updatedFilm;
}

const deleteFilm = async (filmId: number): Promise<void> => {
    const existingFilm = await filmRepo.find(filmId);
    if (!existingFilm) {
        throw new Error(`The film with ID ${filmId} was not found.`);
    }

    const success = await filmRepo.delete(filmId);
    if (!success) {
        throw new Error(`Error deleting the film with ID ${filmId}.`);
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