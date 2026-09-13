import type { Film } from "../types/film/film";
import type { FilmAvailabilityEntry } from "../types/film/filmAvailabilityEntry";
import type { FilmList } from "../types/film/filmList";
import type { FilmStatistics } from "../types/film/filmStatistics";

const API_URL = "/api";

export const filmService = {

    async getAll(): Promise<FilmList[]> {
        const res = await fetch(`${API_URL}/films`, {
            method: "GET",
            credentials: "include",
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(
                errorData.error || "Filme konnten nicht geladen werden."
            );
        }
        return res.json();
    },

    async getById(id: number): Promise<Film> {
        const res = await fetch(`${API_URL}/films/${id}`, {
            method: "GET",
            credentials: "include",
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(
                errorData.error || "Film konnte nicht geladen werden."
            );
        }
        return res.json();
    },


    async getAvailability(): Promise<FilmAvailabilityEntry[]> {
        const res = await fetch(`${API_URL}/films/availability`, {
            method: "GET",
            credentials: "include",
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(
                errorData.error || "Verfügbarkeit konnte nicht geladen werden."
            );
        }
        return res.json();
    },



    async create(payload: Film): Promise<Film> {
        const res = await fetch(`${API_URL}/films/create`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(
                errorData.error || "Film konnte nicht erstellt werden."
            );
        }
        return res.json();
    },



    async update(
        id: number,
        payload: Film
    ): Promise<Film> {


        const res = await fetch(`${API_URL}/films/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(
                errorData.error || "Film konnte nicht aktualisiert werden."
            );

        }
        return res.json();
    },




    async delete(filmId: number): Promise<void> {
        const res = await fetch(
            `${API_URL}/films/${filmId}`,
            {
                method: "DELETE",
                credentials: "include",
            }
        );

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(
                errorData.error ||
                "Film konnte nicht gelöscht werden."
            );
        }
    },

    async getStatistics(): Promise<FilmStatistics> {
        const res = await fetch(
            `${API_URL}/films/statistics`,
            {
                method: "GET",
                credentials: "include"
            }
        );
        if (!res.ok) {
            throw new Error(
                "Statistiken konnten nicht geladen werden."
            );
        }
        return res.json();
    },

};
