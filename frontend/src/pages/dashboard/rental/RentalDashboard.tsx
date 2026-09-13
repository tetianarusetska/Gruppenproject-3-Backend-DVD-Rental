import { useEffect, useState } from "react"
import Pagination from "../film/Pagination" 

type FilmAvailability = {
    film_id: number
    title: string
    store_id: number
    total_copies: number
    available_copies: number
}

const ITEMS_PER_PAGE = 9

export default function RentalDashboard() {
    const [filmSearch, setFilmSearch] = useState("")
    const [films, setFilms] = useState<FilmAvailability[]>([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (filmSearch.trim().length < 2) {
            setFilms([])
            return
        }

        async function loadFilms() {
            setLoading(true)

            try {
                const response = await fetch(
                    `/api/films/availability?title=${encodeURIComponent(
                        filmSearch.trim()
                    )}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                )

                if (!response.ok) {
                    throw new Error(`Fehler ${response.status}`)
                }

                const data: FilmAvailability[] = await response.json()
                setFilms(data)
            } catch (error) {
                console.error("Fehler beim Laden der Filme:", error)
                setFilms([])
            } finally {
                setLoading(false)
            }
        }

        loadFilms()
    }, [filmSearch])

    useEffect(() => {
        setPage(1)
    }, [filmSearch])

    const filmGroups = Object.entries(
        films.reduce<Record<string, FilmAvailability[]>>((acc, film) => {
            if (!acc[film.title]) acc[film.title] = []
            acc[film.title].push(film)
            return acc
        }, {})
    )

    const totalPages = Math.max(1, Math.ceil(filmGroups.length / ITEMS_PER_PAGE))
    const startItem = filmGroups.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1
    const endItem = Math.min(page * ITEMS_PER_PAGE, filmGroups.length)

    const paginatedGroups = filmGroups.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    )

    return (
        <section className="min-h-screen w-full bg-black px-6 py-10 text-white md:px-10">
            <div className="mx-auto w-full max-w-7xl">
                <h1 className="font-['BebasNeue'] text-6xl uppercase leading-none">
                    Verfügbarkeit
                </h1>
                <p className="mt-3 text-sm text-white/50">
                    Suche nach Filmen und prüfe, in welchem Store Exemplare
                    verfügbar sind.
                </p>

                <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
                    <input
                        type="text"
                        value={filmSearch}
                        onChange={(event) => setFilmSearch(event.target.value)}
                        placeholder="Filme nach Titel suchen..."
                        className="w-full rounded-md border border-white/10 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/30 md:max-w-md"
                    />

                    {filmSearch.trim().length >= 2 && (
                        <span className="text-sm text-white/50">
                            {loading
                                ? "Suche läuft..."
                                : `${filmGroups.length} Filme gefunden`}
                        </span>
                    )}
                </div>

                <div className="mt-10">
                    {loading && (
                        <div className="border border-white/10 rounded-xl p-5 text-sm text-white/50">
                            Filme werden geladen...
                        </div>
                    )}

                    {!loading &&
                        filmSearch.trim().length >= 2 &&
                        filmGroups.length === 0 && (
                            <div className="border border-white/10 rounded-xl p-5 text-sm text-white/50">
                                Kein Film gefunden.
                            </div>
                        )}

                    {!loading && filmSearch.trim().length < 2 && (
                        <div className="border border-white/10 rounded-xl p-5 text-sm text-white/50">
                            Gib mindestens 2 Buchstaben ein, um nach verfügbaren
                            Filmen zu suchen.
                        </div>
                    )}

                    {!loading && filmGroups.length > 0 && (
                        <>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {paginatedGroups.map(([title, stores], index) => {
                                    const totalAvailable = stores.reduce(
                                        (sum, store) => sum + Number(store.available_copies),
                                        0
                                    )

                                    const totalCopies = stores.reduce(
                                        (sum, store) => sum + Number(store.total_copies),
                                        0
                                    )

                                    const statusLabel =
                                        totalAvailable >= 5
                                            ? "Verfügbar"
                                            : totalAvailable > 0
                                                ? "Wenig Bestand"
                                                : "Nicht verfügbar"

                                    return (
                                        <div
                                            key={`${title}-${index}`}
                                            className="border border-white/10 rounded-xl p-6"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <h3 className="break-words font-['BebasNeue'] text-3xl uppercase leading-none">
                                                    {title}
                                                </h3>
                                                <span className="shrink-0 rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-white/60">
                                                    {statusLabel}
                                                </span>
                                            </div>

                                            <p className="mt-4 text-sm text-white/50">
                                                Verfügbar: {totalAvailable} / {totalCopies}
                                            </p>

                                            <div className="mt-6 flex flex-col gap-4">
                                                {stores.map((store) => (
                                                    <div
                                                        key={`${store.film_id}-${store.store_id}-${store.available_copies}`}
                                                        className="flex items-center justify-between border-b border-white/5 pb-3"
                                                    >
                                                        <div>
                                                            <p className="text-sm font-semibold">
                                                                Store {store.store_id}
                                                            </p>
                                                            <p className="text-sm text-white/50">
                                                                Bestand: {store.total_copies} DVDs
                                                            </p>
                                                        </div>
                                                        <span className="text-2xl font-bold">
                                                            {store.available_copies}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <Pagination
                                page={page}
                                totalPages={totalPages}
                                startItem={startItem}
                                endItem={endItem}
                                totalItems={filmGroups.length}
                                onChange={setPage}
                            />
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}