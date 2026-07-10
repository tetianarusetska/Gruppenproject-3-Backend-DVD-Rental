import type { Film } from "../pages/dashboard/films/types/Film";
import type { FilmList } from "../pages/dashboard/films/types/FilmList";

const API_URL = "http://localhost:3000";

export interface FilmAvailabilityEntry {
    film_id: number;
    title: string;
    store_id: number;
    total_copies: number;
    available_copies: number;
}

export interface FilmStatistics {
    totalFilms: number;
    totalCopies: number;
    availableCopies: number;
    avgLength: number;
    avgRentalRate: string;
    topRating: string;

    topFilms: {
        title: string;
        rentals: number;
    }[];

    ratings: {
        rating: string;
        count: number;
    }[];

    rentalsByMonth: {
        month: string;
        count: number;
    }[];
}

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
