 import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type FilmAvailability = {
  film_id: number
  title: string
  store_id: number
  total_copies: number
  available_copies: number
}

export default function RentalDashboard() {
  const [filmSearch, setFilmSearch] = useState("")
  const [films, setFilms] = useState<FilmAvailability[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (filmSearch.trim().length < 2) {
      setFilms([])
      return
    }

    async function loadFilms() {
      setLoading(true)

      try {
        const response = await fetch(
          `http://localhost:3000/films/availability?title=${encodeURIComponent(
            filmSearch.trim()
          )}`
        )

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

  const filmGroups = Object.entries(
    films.reduce<Record<string, FilmAvailability[]>>((acc, film) => {
      if (!acc[film.title]) acc[film.title] = []
      acc[film.title].push(film)
      return acc
    }, {})
  )

  return (
    <section className="min-h-screen w-full overflow-x-hidden bg-gray-950 px-3 py-8 text-white sm:px-6 md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 max-w-full">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-violet-400 sm:text-sm">
            DVD-Verleih
          </p>

          <h1 className="mt-3 break-words text-2xl font-bold leading-tight sm:text-4xl md:text-6xl">
            Filmverwaltung
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base md:text-lg">
            Suche nach Filmen und prüfe direkt, in welchem Store Exemplare
            verfügbar sind.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-4 sm:p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 sm:text-sm">
                Filmsuche
              </p>

              <h2 className="mt-2 break-words text-xl font-bold leading-tight sm:text-3xl">
                Verfügbarkeit prüfen
              </h2>
            </div>

            {filmSearch.trim().length >= 2 && (
              <p className="text-sm text-gray-400">
                {loading
                  ? "Suche läuft..."
                  : `${filmGroups.length} Filme gefunden`}
              </p>
            )}
          </div>

          <input
            type="text"
            value={filmSearch}
            onChange={(event) => setFilmSearch(event.target.value)}
            placeholder="Filmtitel eingeben..."
            className="mt-6 w-full rounded-2xl border border-slate-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-violet-500 sm:px-5 sm:py-4 sm:text-base"
          />

          <p className="mt-4 text-sm leading-relaxed text-gray-500 sm:text-base">
            Gib mindestens 2 Buchstaben ein, um nach verfügbaren Filmen zu
            suchen.
          </p>

          <div className="mt-8">
            {loading && (
              <div className="rounded-2xl border border-slate-800 bg-gray-950 p-5 text-sm text-gray-400">
                Filme werden geladen...
              </div>
            )}

            {!loading &&
              filmSearch.trim().length >= 2 &&
              filmGroups.length === 0 && (
                <div className="rounded-2xl border border-slate-800 bg-gray-950 p-5 text-sm text-gray-400">
                  Kein Film gefunden.
                </div>
              )}

            {!loading && filmGroups.length > 0 && (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filmGroups.map(([title, stores], index) => {
                  const totalAvailable = stores.reduce(
                    (sum, store) => sum + Number(store.available_copies),
                    0
                  )

                  const totalCopies = stores.reduce(
                    (sum, store) => sum + Number(store.total_copies),
                    0
                  )

                  return (
                    <motion.article
                      key={`${title}-${index}`}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.04 }}
                      className="overflow-hidden rounded-3xl border border-slate-800 bg-gray-950 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-950/30"
                    >
                      <div className="flex min-h-44 flex-col justify-between bg-gradient-to-br from-violet-700 via-slate-900 to-black p-5 sm:min-h-56 sm:p-6">
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-violet-200 sm:text-xs">
                            Filmcover
                          </p>

                          <h3 className="mt-6 break-words text-xl font-black uppercase leading-tight tracking-tight sm:text-3xl">
                            {title}
                          </h3>
                        </div>

                        <p className="mt-6 text-sm text-violet-100">
                          Verfügbar: {totalAvailable} / {totalCopies}
                        </p>
                      </div>

                      <div className="p-5 sm:p-6">
                        <div className="mb-5 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
                          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 sm:text-sm">
                            Bestand
                          </p>

                          <span
                            className={`rounded-full px-4 py-1 text-center text-xs font-bold uppercase tracking-wide ${
                              totalAvailable > 0
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-red-500/10 text-red-400"
                            }`}
                          >
                            {totalAvailable > 0
                              ? "Verfügbar"
                              : "Nicht verfügbar"}
                          </span>
                        </div>

                        <div className="space-y-4">
                          {stores.map((store) => (
                            <div
                              key={`${store.film_id}-${store.store_id}-${store.available_copies}`}
                              className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
                            >
                              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="min-w-0">
                                  <p className="text-sm font-semibold sm:text-base">
                                    Store {store.store_id}
                                  </p>
                                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                                    {store.total_copies} Exemplare gesamt
                                  </p>
                                </div>

                                <div className="rounded-xl bg-gray-950 px-4 py-3 text-center">
                                  <p
                                    className={`text-2xl font-bold ${
                                      Number(store.available_copies) > 0
                                        ? "text-emerald-400"
                                        : "text-red-400"
                                    }`}
                                  >
                                    {store.available_copies}
                                  </p>
                                  <p className="text-[10px] uppercase tracking-widest text-gray-500 sm:text-xs">
                                    verfügbar
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.article>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}