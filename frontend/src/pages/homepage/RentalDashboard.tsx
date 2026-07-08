 import { useEffect, useState } from "react"

type Rental = {
  rental_id: number
  rental_date: string
  return_date: string | null
  customer_first_name: string
  customer_last_name: string
  film_title: string
}

export default function RentalDashboard() {
  const [search, setSearch] = useState("")
  const [rentals, setRentals] = useState<Rental[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (search.trim().length < 2) {
      setRentals([])
      return
    }

    async function loadRentals() {
      setLoading(true)

      try {
        const response = await fetch(
          `http://localhost:3000/rentals/search?name=${encodeURIComponent(
            search.trim()
          )}`
        )

        if (!response.ok) {
          throw new Error("Request failed")
        }

        const data: Rental[] = await response.json()
        setRentals(data)
      } catch (error) {
        console.error("Fehler beim Laden der Rentals:", error)
        setRentals([])
      } finally {
        setLoading(false)
      }
    }

    loadRentals()
  }, [search])

  return (
    <section className="bg-gray-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-400">
            DVD Rental
          </p>

          <h1 className="mt-4 text-5xl font-bold md:text-6xl">
            Dashboard
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Manage rentals, search customers and keep track of every movie.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
              Total Rentals
            </p>
            <h3 className="mt-5 text-6xl font-bold">16.044</h3>
            <p className="mt-4 text-gray-500">All rental records</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
              Active Rentals
            </p>
            <h3 className="mt-5 text-6xl font-bold">183</h3>
            <p className="mt-4 text-gray-500">Currently not returned</p>
          </div>

          <div className="rounded-3xl border border-violet-500/40 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
              Search Results
            </p>
            <h3 className="mt-5 text-6xl font-bold">{rentals.length}</h3>
            <p className="mt-4 text-gray-500">Current search matches</p>
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">
                Customer Search
              </p>
              <h2 className="mt-3 text-3xl font-bold">Find rentals</h2>
            </div>

            {search.trim().length >= 2 && (
              <p className="text-sm text-gray-400">
                {loading ? "Searching..." : `${rentals.length} results found`}
              </p>
            )}
          </div>

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by customer name..."
            className="mt-8 w-full rounded-2xl border border-slate-700 bg-gray-950 px-5 py-4 text-base text-white outline-none transition placeholder:text-gray-500 focus:border-violet-500"
          />

          <p className="mt-4 text-gray-500">
            Type at least 2 letters to search rental records by customer name.
          </p>

          <div className="mt-10">
            {loading && (
              <div className="rounded-2xl border border-slate-800 bg-gray-950 p-6 text-gray-400">
                Loading rentals...
              </div>
            )}

            {!loading && search.trim().length >= 2 && rentals.length === 0 && (
              <div className="rounded-2xl border border-slate-800 bg-gray-950 p-6 text-gray-400">
                No rentals found.
              </div>
            )}

            {!loading && rentals.length > 0 && (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {rentals.map((rental) => (
                  <div
                    key={rental.rental_id}
                    className="rounded-2xl border border-slate-800 bg-gray-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
                          Rental #{rental.rental_id}
                        </p>

                        <h3 className="mt-3 text-2xl font-bold">
                          {rental.customer_first_name}{" "}
                          {rental.customer_last_name}
                        </h3>
                      </div>

                      <span
                        className={`rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wide ${
                          rental.return_date
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {rental.return_date ? "Returned" : "Active"}
                      </span>
                    </div>

                    <div className="mt-6 grid gap-5 border-t border-slate-800 pt-5">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-gray-500">
                          Film
                        </p>
                        <p className="mt-1 text-lg font-semibold text-gray-200">
                          {rental.film_title}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-gray-500">
                            Rental Date
                          </p>
                          <p className="mt-1 text-gray-300">
                            {new Date(rental.rental_date).toLocaleDateString(
                              "de-DE"
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-widest text-gray-500">
                            Return Date
                          </p>
                          <p className="mt-1 text-gray-300">
                            {rental.return_date
                              ? new Date(rental.return_date).toLocaleDateString(
                                  "de-DE"
                                )
                              : "Not returned"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}