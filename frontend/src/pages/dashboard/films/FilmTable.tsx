import { useState } from "react";
import type { FilmList } from "./types/FilmList";

export interface FilmAvailability {
  total_copies: number;
  available_copies: number;
}

interface FilmTableProps {
  films: FilmList[];
  selectedFilm: FilmList | null;
  onSelect: (film: FilmList) => void;
  availability?: Record<number, FilmAvailability>;
}

export default function FilmTable({
  films,
  selectedFilm,
  onSelect,
  availability,
}: FilmTableProps) {

  const [hoverFilm, setHoverFilm] = useState<FilmList | null>(null);

  return (
    <div className="relative mt-10 w-[90%] overflow-x-auto border border-zinc-800">

      <table className="w-full text-left text-sm font-['Montserrat']">

        <thead>
          <tr className="border-b border-zinc-800 text-zinc-500">

            <th className="px-4 py-3 font-normal">ID</th>
            <th className="px-4 py-3 font-normal">Titel</th>
            <th className="px-4 py-3 font-normal">Jahr</th>
            <th className="px-4 py-3 font-normal">Länge</th>
            <th className="px-4 py-3 font-normal">Rating</th>
            <th className="px-4 py-3 font-normal">Sprache</th>
            <th className="px-4 py-3 font-normal">Kategorien</th>
            <th className="px-4 py-3 font-normal">Schauspieler</th>
            <th className="px-4 py-3 font-normal">Verfügbarkeit</th>

          </tr>
        </thead>
        <tbody>

          {films.map((film) => {
            const avail = availability?.[film.film_id];

            return (
              <tr
                key={`${film.film_id}-${film.title}`}
                onMouseEnter={() => setHoverFilm(film)}
                onMouseLeave={() => setHoverFilm(null)}
                onClick={() => onSelect(film)}
                className={`
                cursor-pointer
                border-b
                border-zinc-900
                transition
                hover:bg-zinc-900
                ${selectedFilm?.film_id === film.film_id
                    ? "bg-zinc-900"
                    : ""
                  }
              `}
              >
                <td className="px-4 py-3 text-zinc-400">
                  {film.film_id}
                </td>

                <td className="px-4 py-3">
                  {film.title}
                </td>

                <td className="px-4 py-3 text-zinc-400">
                  {film.release_year}
                </td>

                <td className="px-4 py-3 text-zinc-400">
                  {film.length} min
                </td>

                <td className="px-4 py-3">
                  {film.rating}
                </td>

                <td className="px-4 py-3 text-zinc-400">
                  {film.language_name.trim()}
                </td>

                <td className="px-4 py-3 text-zinc-400">
                  {film.categories}
                </td>

                <td className="px-4 py-3 max-w-[250px] truncate text-zinc-400">
                  {film.actors}
                </td>

                <td className="px-4 py-3">

                  {avail ? (
                    <span>
                      {avail.available_copies}/{avail.total_copies}
                    </span>
                  ) : (
                    "-"
                  )}

                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {hoverFilm && (

        <div
          className="
          fixed
          right-10
          top-40
          z-50
          w-[350px]
          rounded-2xl
          border
          border-zinc-800
          bg-black
          p-6
          shadow-xl
          "
        >

          <h3 className="text-2xl uppercase font-['BebasNeue']">
            {hoverFilm.title}
          </h3>


          <p className="mt-2 text-sm text-zinc-500">
            {hoverFilm.release_year}
            {" · "}
            {hoverFilm.length} min
            {" · "}
            {hoverFilm.rating}
          </p>

          <div className="mt-5">

            <p className="text-xs text-zinc-500">
              Kategorien
            </p>

            <p className="mt-1 text-sm">
              {hoverFilm.categories}
            </p>

          </div>

          <div className="mt-4">

            <p className="text-xs text-zinc-500">
              Schauspieler
            </p>

            <p className="mt-1 line-clamp-3 text-sm text-zinc-300">
              {hoverFilm.actors}
            </p>

          </div>

        </div>

      )}

    </div>
  );
}