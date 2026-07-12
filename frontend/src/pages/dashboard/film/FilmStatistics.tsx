import { useEffect, useState } from "react";
import { filmService } from "../../../services/film.service";
import type { FilmStatistics } from "../../../types/film/filmStatistics";

export default function FilmStatistics() {
    const [stats, setStats] = useState<FilmStatistics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        filmService.getStatistics()
            .then(setStats)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="mt-10 w-[90%] rounded-2xl border border-zinc-800 bg-black p-10 text-center text-zinc-500 font-['Montserrat']">
                Lade Statistiken...
            </div>
        );
    }

    if (!stats) return null;

    return (
        <div className="mt-30 w-[90%] space-y-6">

            <div className="grid grid-cols-6 gap-5">
                <Kpi title="Filme" value={stats.totalFilms}/>
                <Kpi title="Kopien" value={stats.totalCopies}/>
                <Kpi title="Verfügbar" value={stats.availableCopies}/>
                <Kpi title="Ø Länge" value={`${stats.avgLength} min`}/>
                <Kpi title="Ø Rate" value={`$${stats.avgRentalRate}`}/>
                <Kpi title="Rating" value={stats.topRating}/>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <TopFilms data={stats.topFilms}/>
                <Ratings data={stats.ratings}/>
            </div>

        </div>
    );
}


function Kpi({
    title,
    value
}:{
    title:string;
    value:string | number;
}) {
    return (
        <div className="rounded-2xl border border-zinc-800 bg-black p-5 font-['Montserrat']">
            <p className="text-xs uppercase text-zinc-500">
                {title}
            </p>

            <p className="mt-3 text-4xl text-white font-['BebasNeue']">
                {value}
            </p>
        </div>
    );
}


function TopFilms({
    data
}:{
    data:FilmStatistics["topFilms"];
}) {
    const max = data[0]?.rentals ?? 1;

    return (
        <div className="mt-20 rounded-2xl border border-zinc-800 bg-black p-6 font-['Montserrat']">

            <h3 className="font-['BebasNeue'] text-2xl uppercase text-white">
                Top Filme
            </h3>

            <div className="mt-6 space-y-4">

                {data.map((film, index) => (
                    <div key={film.title}>

                        <div className="flex justify-between text-xs text-zinc-300">
                            <span>
                                {index + 1}. {film.title}
                            </span>

                            <span className="text-white">
                                {film.rentals}
                            </span>
                        </div>

                        <div className="mt-2 h-2 rounded-full bg-zinc-900">
                            <div
                                className="h-full rounded-full bg-white"
                                style={{
                                    width:`${(film.rentals / max) * 100}%`
                                }}
                            />
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}


function Ratings({
    data
}:{
    data:FilmStatistics["ratings"];
}) {
    const max = data[0]?.count ?? 1;

    return (
        <div className="mt-20 rounded-2xl border border-zinc-800 bg-black p-6 font-['Montserrat']">

            <h3 className="font-['BebasNeue'] text-2xl uppercase text-white">
                Bewertungen
            </h3>

            <div className="mt-6 space-y-5">

                {data.map(item => (
                    <div key={item.rating}>

                        <div className="flex justify-between text-xs text-zinc-300">
                            <span>
                                {item.rating}
                            </span>

                            <span>
                                {item.count}
                            </span>
                        </div>

                        <div className="mt-2 h-2 rounded-full bg-zinc-900">
                            <div
                                className="h-full rounded-full bg-white"
                                style={{
                                    width:`${(item.count / max) * 100}%`
                                }}
                            />
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}