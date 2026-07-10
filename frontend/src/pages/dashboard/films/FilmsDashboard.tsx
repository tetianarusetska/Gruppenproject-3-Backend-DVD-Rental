import { useState, useEffect } from "react";

import Buttons from "./Buttons";
import Search from "./Search";
import FilmTable from "./FilmTable";
import Pagination from "./Pagination";
import Modal from "./modals/Modal";
import FilmModal from "./modals/FilmModal";

import type { Film } from "./types/Film";
import type { FilmList } from "./types/FilmList";
import type { FilmAvailability } from "./FilmTable";

import { filmService } from "../../../services/film.service";
import FilmStatistics from "./FilmStatistics";

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
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [availability, setAvailability] = useState<Record<number, FilmAvailability>>({});
    const [sort, setSort] = useState("default");

    const itemsPerPage = 15;

    const loadFilms = async () => {
        try {
            setLoading(true);

            const data = await filmService.getAll();

            const uniqueFilms = Array.from(
                new Map(
                    data.map(film => [film.film_id, film])
                ).values()
            );

            setFilms(uniqueFilms);

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const loadAvailability = async () => {
        try {
            const data = await filmService.getAvailability();
            const map: Record<number, FilmAvailability> = {};

            for (const entry of data) {
                const existing = map[entry.film_id];
                map[entry.film_id] = {
                    total_copies: (existing?.total_copies ?? 0) + entry.total_copies,
                    available_copies: (existing?.available_copies ?? 0) + entry.available_copies,
                };
            }

            setAvailability(map);
        } catch (err) {
            console.error("Failed to load film availability:", err);
        }
    };

    useEffect(() => {
        loadFilms();
        loadAvailability();
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
            setShowDetailsModal(true);

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
            const data =
                filmDetails && filmDetails.film_id === selectedFilm.film_id
                    ? filmDetails
                    : await filmService.getById(selectedFilm.film_id);

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

    const sortedFilms = [...filteredFilms].sort((a, b) => {

        if (sort === "year_old") {
            return a.release_year - b.release_year;
        }

        if (sort === "year_new") {
            return b.release_year - a.release_year;
        }

        if (sort === "length_long") {
            return b.length - a.length;
        }

        if (sort === "length_short") {
            return a.length - b.length;
        }

        if (sort === "title_desc") {
            return b.title.localeCompare(a.title);
        }

        if (sort === "default") {
            return 0;
        }

        return a.title.localeCompare(b.title);
    });

    const totalItems = sortedFilms.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    useEffect(() => {
        if (totalPages === 0) {
            if (page !== 1) setPage(1);
            return;
        }
        if (page > totalPages) {
            setPage(totalPages);
        }
    }, [totalPages, page]);

    const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;

    const endItem = Math.min(
        page * itemsPerPage,
        totalItems
    );

    const currentFilms = sortedFilms.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <div className="min-h-screen w-full">

            <h1 className="uppercase font-['BebasNeue'] text-6xl">
                Filme
            </h1>

            <div className="
    mt-20
    flex
    w-[90%]
    items-center
    gap-6
">

                <Search
                    value={searchQuery}
                    onChange={(value) => {
                        setSearchQuery(value);
                        setPage(1);
                    }}
                />

                <div className="relative">

                    <select
                        value={sort}
                        onChange={(e) => {
                            setSort(e.target.value);
                            setPage(1);
                        }}
                        className="
            appearance-none
            w-48
            rounded-2xl
            border
            border-zinc-800
            bg-black
            px-5
            py-2.5
            pr-10
            text-sm
            text-zinc-300
            font-['Montserrat']
            outline-none
            transition
            hover:border-zinc-600
            focus:border-zinc-500
            cursor-pointer
        "
                    >
                        <option value="default">
                            Sortierung
                        </option>

                        <option value="title_asc">
                            Titel A-Z
                        </option>

                        <option value="title_desc">
                            Titel Z-A
                        </option>

                        <option value="year_new">
                            Neueste Filme
                        </option>

                        <option value="year_old">
                            Älteste Filme
                        </option>

                        <option value="length_long">
                            Längste Filme
                        </option>

                        <option value="length_short">
                            Kürzeste Filme
                        </option>

                    </select>


                    <span
                        className="
            pointer-events-none
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-zinc-500
            text-xs
        "
                    >
                        ▼
                    </span>

                </div>

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
                availability={availability}
            />

            <Pagination
                page={page}
                totalPages={totalPages}
                startItem={startItem}
                endItem={endItem}
                totalItems={totalItems}
                onChange={setPage}
            />

            <FilmStatistics />

            {showDetailsModal && filmDetails && (
                <FilmModal
                    film={filmDetails}
                    onClose={() => setShowDetailsModal(false)}
                />
            )}

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
                                loadAvailability();
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
                            loadAvailability();
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
