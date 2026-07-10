import { useState, useEffect } from "react";

import Buttons from "./Buttons";
import Search from "./Search";
import FilmTable from "./FilmTable";
import Pagination from "./Pagination";
import Modal from "./modals/Modal";

import type { Film } from "./types/Film";
import type { FilmList } from "./types/FilmList";

import { filmService } from "../../../services/film.service";

export default function FilmsDashboard() {
    const [films, setFilms] = useState<FilmList[]>([]);
    const [selectedFilm, setSelectedFilm] = useState<FilmList | null>(null);
    const [filmDetails, setFilmDetails] = useState<Film | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [modalMode, setModalMode] = useState<"create" | "edit" | "delete" | null>(null);
    const [page, setPage] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [modalError, setModalError] = useState<string | null>(null);

    const itemsPerPage = 15;

    const loadFilms = async () => {
        try {
            setLoading(true);
            const data = await filmService.getAll();
            setFilms(data);
        } catch (err) {
            if (err instanceof Error) setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFilms();
    }, []);

    const handleCreate = () => {
        setFilmDetails(null);
        setModalMode("create");
    };

    const handleSelectFilm = async (film: FilmList) => {
        try {
            setLoading(true);
            setSelectedFilm(film);

            const data = await filmService.getById(film.film_id);
            setFilmDetails(data);

        } catch (err) {
            if (err instanceof Error) setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async () => {
        if (!selectedFilm) return;

        try {
            setLoading(true);

            const data = await filmService.getById(selectedFilm.film_id);

            setFilmDetails(data);
            setModalMode("edit");

        } catch (err) {
            if (err instanceof Error) setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = () => {
        if (!selectedFilm) return;
        setModalMode("delete");
    };

    const filteredFilms = films.filter((film) =>
        film.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalItems = filteredFilms.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;

    const endItem = Math.min(
        page * itemsPerPage,
        totalItems
    );

    const currentFilms = filteredFilms.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <div className="min-h-screen w-full">

            <h1 className="uppercase font-['BebasNeue'] text-6xl">
                Filme
            </h1>

            <div className="mt-20 flex w-[90%] items-center justify-between">

                <Search
                    value={searchQuery}
                    onChange={(value) => {
                        setSearchQuery(value);
                        setPage(1);
                    }}
                />

                <Buttons
                    hasSelection={selectedFilm !== null}
                    onCreate={handleCreate}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

            </div>

            {error && (
                <p className="mt-4 text-red-400">
                    {error}
                </p>
            )}

            {loading && (
                <p className="mt-4 text-zinc-400">
                    Laden...
                </p>
            )}

            <FilmTable
                films={currentFilms}
                selectedFilm={selectedFilm}
                onSelect={handleSelectFilm}
            />

            <Pagination
                page={page}
                totalPages={totalPages}
                startItem={startItem}
                endItem={endItem}
                totalItems={totalItems}
                onChange={setPage}
            />

            {modalMode && (
                <Modal
                    mode={modalMode}
                    film={
                        modalMode === "delete"
                            ? selectedFilm as unknown as Film
                            : filmDetails
                    }
                    error={modalError}
                    onClose={() => {
                        setModalMode(null);
                        setModalError(null);
                    }}
                    onSubmit={async (data) => {
                        try {
                            setModalError(null);
                            if (modalMode === "delete" && selectedFilm) {
                                await filmService.delete(selectedFilm.film_id);
                                setFilms(prev =>
                                    prev.filter(
                                        film => film.film_id !== selectedFilm.film_id
                                    )
                                );
                                setSelectedFilm(null);
                                setFilmDetails(null);
                                setModalMode(null);
                                return;
                            }

                            if (modalMode === "create") {
                                await filmService.create(data!);
                            }

                            if (modalMode === "edit" && selectedFilm) {
                                await filmService.update(
                                    selectedFilm.film_id,
                                    data!
                                );
                            }

                            const updatedFilms = await filmService.getAll();
                            setFilms(updatedFilms);
                            setModalMode(null);
                        } catch (err) {
                            if (err instanceof Error) {
                                setModalError(err.message);
                            }
                        }
                    }}
                />
            )}


        </div>
    );
}